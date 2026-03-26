/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Upload, 
  Play, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  BarChart3, 
  Hash, 
  Layers, 
  CheckCircle2, 
  HelpCircle,
  Download
} from 'lucide-react';
import { CATEGORIES, EXAMPLES } from './constants';

type CategoryKey = keyof typeof CATEGORIES;

interface WordResult {
  word: string;
  category: CategoryKey;
  count: number;
}

interface ClassificationResult {
  totalWords: number;
  classifiedCount: number;
  otherCount: number;
  categoryStats: Record<CategoryKey, number>;
  wordList: WordResult[];
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<ClassificationResult | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [activeFilter, setActiveFilter] = useState<CategoryKey | 'all'>('all');
  const [showJson, setShowJson] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tokenization logic
  const tokenize = (text: string) => {
    // Handle Uzbek apostrophes ' and ’
    // Split by non-word characters but keep internal apostrophes
    return text
      .toLowerCase()
      .split(/[^a-z'’ʻ‘а-яёқғҳ]/i)
      .filter(word => word.length > 1);
  };

  const classifyText = () => {
    if (!inputText.trim()) return;
    
    setIsClassifying(true);
    
    // Simulate processing delay for "premium" feel
    setTimeout(() => {
      const tokens = tokenize(inputText);
      const wordCounts: Record<string, number> = {};
      const wordCategories: Record<string, CategoryKey> = {};
      
      const categoryStats: Record<CategoryKey, number> = {
        huquq: 0,
        iqtisod: 0,
        jamiyat: 0,
        talim: 0,
        texnologiyalar: 0,
        sport: 0,
        boshqa: 0
      };

      tokens.forEach(token => {
        wordCounts[token] = (wordCounts[token] || 0) + 1;
        
        if (!wordCategories[token]) {
          let found = false;
          for (const [catKey, catData] of Object.entries(CATEGORIES)) {
            if (catKey === 'boshqa') continue;
            if (catData.words.includes(token)) {
              wordCategories[token] = catKey as CategoryKey;
              found = true;
              break;
            }
          }
          if (!found) {
            wordCategories[token] = 'boshqa';
          }
        }
      });

      // Calculate stats based on total occurrences
      tokens.forEach(token => {
        categoryStats[wordCategories[token]]++;
      });

      const wordList: WordResult[] = Object.keys(wordCounts).map(word => ({
        word,
        category: wordCategories[word],
        count: wordCounts[word]
      })).sort((a, b) => b.count - a.count);

      setResults({
        totalWords: tokens.length,
        classifiedCount: tokens.length - categoryStats.boshqa,
        otherCount: categoryStats.boshqa,
        categoryStats,
        wordList
      });
      
      setIsClassifying(false);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 800);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInputText(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const filteredWordList = useMemo(() => {
    if (!results) return [];
    if (activeFilter === 'all') return results.wordList;
    return results.wordList.filter(item => item.category === activeFilter);
  }, [results, activeFilter]);

  const stats = [
    { label: 'Jami so\'zlar', value: results?.totalWords || 0, icon: Hash },
    { label: 'Tasnif etilgan', value: results?.classifiedCount || 0, icon: CheckCircle2 },
    { label: 'Boshqa', value: results?.otherCount || 0, icon: HelpCircle },
    { label: 'Kategoriyalar', value: Object.keys(CATEGORIES).length, icon: Layers },
  ];

  const renderJson = (obj: any) => {
    const json = JSON.stringify(obj, null, 2);
    return json.split('\n').map((line, i) => {
      let coloredLine = line;
      // Simple syntax highlighting
      if (line.includes(':')) {
        const [key, val] = line.split(':');
        coloredLine = (
          <span key={i}>
            <span className="text-cyan-400">{key}</span>:
            <span className={val.includes('"') ? "text-green-400" : "text-gold"}>{val}</span>
            {'\n'}
          </span>
        );
      } else {
        coloredLine = <span key={i}>{line}{'\n'}</span>;
      }
      return coloredLine;
    });
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-12 flex flex-col gap-12">
      {/* Header */}
      <header className="flex flex-col items-center text-center gap-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 relative flex items-center justify-center"
        >
          <div className="absolute inset-0 border-2 border-gold rotate-45 rounded-lg gold-glow" />
          <span className="text-3xl font-black text-gold z-10">UZ</span>
        </motion.div>
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            O'zbek <span className="text-gold">Korpus</span> Tasniflagich
          </h1>
          <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">
            Uzbek Text Corpus Classifier · Dictionary-based
          </p>
        </div>
      </header>

      {/* Legend */}
      <section className="flex flex-wrap justify-center gap-3">
        {Object.values(CATEGORIES).map((cat) => (
          <div 
            key={cat.id}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-semibold tracking-wide"
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
            {cat.label}
          </div>
        ))}
      </section>

      {/* Main Input Section */}
      <main className="flex flex-col gap-6">
        {/* Tabs */}
        <div className="flex gap-2 p-1 rounded-xl bg-surface-1 w-fit mx-auto border border-white/5">
          <button 
            onClick={() => setActiveTab('text')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'text' ? 'bg-gold text-bg-dark shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            <FileText size={16} />
            ✎ Matn kiriting
          </button>
          <button 
            onClick={() => setActiveTab('file')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'file' ? 'bg-gold text-bg-dark shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            <Upload size={16} />
            ⊞ Fayl yuklang
          </button>
        </div>

        {/* Input Card */}
        <div className="glass rounded-2xl overflow-hidden shadow-2xl border-white/5">
          <AnimatePresence mode="wait">
            {activeTab === 'text' ? (
              <motion.div 
                key="text-input"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col"
              >
                <textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Matnni shu yerga kiriting yoki namunani tanlang..."
                  className="w-full h-64 p-8 bg-transparent outline-none font-mono text-lg resize-none placeholder:text-gray-700 text-gold/90"
                />
                <div className="flex flex-wrap items-center justify-between p-4 bg-white/5 border-t border-white/5 gap-4">
                  <div className="flex gap-2">
                    {EXAMPLES.map((ex, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setInputText(ex.text)}
                        className="px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-400 hover:text-gold transition-colors"
                      >
                        {ex.title}
                      </button>
                    ))}
                    <button 
                      onClick={() => setInputText('')}
                      className="px-3 py-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 text-xs font-bold text-red-400 transition-colors flex items-center gap-1"
                    >
                      <Trash2 size={12} />
                      Tozalash
                    </button>
                  </div>
                  <div className="flex gap-4 text-[10px] font-mono text-gray-500 uppercase tracking-tighter">
                    <span>Belgilar: <b className="text-gold">{inputText.length}</b></span>
                    <span>So'zlar: <b className="text-gold">{tokenize(inputText).length}</b></span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="file-input"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-12"
              >
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/10 rounded-xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-gold/50 hover:bg-gold/5 transition-all group"
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="text-gold" size={32} />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">Faylni tanlang yoki shu yerga tashlang</p>
                    <p className="text-gray-500 text-sm">Faqat .txt formatidagi UTF-8 kodirovkali fayllar</p>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    accept=".txt" 
                    className="hidden" 
                  />
                </div>
                {inputText && (
                  <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="text-green-400" />
                      <span className="text-sm font-medium text-green-400">Fayl muvaffaqiyatli yuklandi</span>
                    </div>
                    <button onClick={() => setInputText('')} className="text-gray-500 hover:text-white">
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <button 
          onClick={classifyText}
          disabled={!inputText.trim() || isClassifying}
          className="w-full py-6 rounded-2xl bg-gold text-bg-dark font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(232,197,109,0.3)] hover:shadow-[0_0_50px_rgba(232,197,109,0.5)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed group"
        >
          {isClassifying ? (
            <div className="w-6 h-6 border-4 border-bg-dark/20 border-t-bg-dark rounded-full animate-spin" />
          ) : (
            <>
              <Play fill="currentColor" size={24} className="group-hover:translate-x-1 transition-transform" />
              Tasnifla — Classify
            </>
          )}
        </button>
      </main>

      {/* Results Section */}
      <AnimatePresence>
        {results && (
          <motion.section 
            id="results"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-12 pt-12 border-t border-white/5"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass p-6 rounded-2xl flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-xs font-bold uppercase tracking-wider">{stat.label}</span>
                    <stat.icon size={16} />
                  </div>
                  <span className="text-4xl font-black text-gold">{stat.value}</span>
                </motion.div>
              ))}
            </div>

            {/* Distribution Chart */}
            <div className="glass p-8 rounded-2xl flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-gold" />
                <h2 className="text-xl font-bold text-white">Kategoriyalar taqsimoti</h2>
              </div>
              <div className="flex flex-col gap-6">
                {Object.entries(CATEGORIES).map(([key, cat], idx) => {
                  const count = results.categoryStats[key as CategoryKey];
                  const percentage = results.totalWords > 0 ? (count / results.totalWords) * 100 : 0;
                  return (
                    <div key={key} className="flex flex-col gap-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wide">
                        <span className="text-gray-400">{cat.label}</span>
                        <span className="text-gold">{count} so'z ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Word Table */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-white">So'zlar ro'yxati</h2>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setActiveFilter('all')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeFilter === 'all' ? 'bg-white text-bg-dark' : 'bg-white/5 text-gray-500 hover:text-white'}`}
                  >
                    Hammasi
                  </button>
                  {Object.values(CATEGORIES).map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => setActiveFilter(cat.id as CategoryKey)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border border-transparent ${activeFilter === cat.id ? 'bg-white/10 text-white border-white/20' : 'bg-white/5 text-gray-500 hover:text-white'}`}
                      style={activeFilter === cat.id ? { color: cat.color, borderColor: `${cat.color}40` } : {}}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl overflow-hidden">
                <div className="max-h-[500px] overflow-y-auto scrollbar-hide">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-surface-2 z-10">
                      <tr className="border-b border-white/5">
                        <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">So'z</th>
                        <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Kategoriya</th>
                        <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredWordList.map((item, idx) => (
                        <motion.tr 
                          key={item.word}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.01 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                        >
                          <td className="px-8 py-4 font-mono text-gold/80 group-hover:text-gold">{item.word}</td>
                          <td className="px-8 py-4">
                            <span 
                              className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter"
                              style={{ backgroundColor: `${CATEGORIES[item.category].color}20`, color: CATEGORIES[item.category].color }}
                            >
                              {CATEGORIES[item.category].label}
                            </span>
                          </td>
                          <td className="px-8 py-4 text-right font-mono text-gray-500">{item.count}</td>
                        </motion.tr>
                      ))}
                      {filteredWordList.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-8 py-20 text-center text-gray-600 font-medium italic">
                            Bu kategoriya bo'yicha so'zlar topilmadi
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* JSON Output */}
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => setShowJson(!showJson)}
                className="flex items-center justify-between w-full p-6 glass rounded-2xl hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Hash className="text-cyan-400" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-bold">JSON Ma'lumotlar</p>
                    <p className="text-gray-500 text-xs uppercase tracking-widest">Raw classification data output</p>
                  </div>
                </div>
                {showJson ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
              </button>
              
              <AnimatePresence>
                {showJson && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="glass p-8 rounded-2xl bg-black/40 relative">
                      <button 
                        onClick={() => {
                          const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'classification_results.json';
                          a.click();
                        }}
                        className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gold transition-all"
                        title="Download JSON"
                      >
                        <Download size={18} />
                      </button>
                      <pre className="font-mono text-sm whitespace-pre-wrap leading-relaxed scrollbar-hide">
                        {renderJson(results)}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <footer className="py-12 text-center flex flex-col gap-2">
              <p className="text-gray-600 text-xs font-bold uppercase tracking-[0.3em]">
                O'zbek Korpus Tasniflagich © 2026
              </p>
              <p className="text-gray-700 text-[10px] font-medium">
                Premium Text Analysis Engine · Built with React & Tailwind
              </p>
            </footer>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
