/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const CATEGORIES = {
  huquq: {
    id: 'huquq',
    label: 'Huquq',
    color: '#5b8dee',
    description: 'Legal, law, court related',
    words: ["huquq", "qonun", "sud", "jinoyat", "prokuror", "advokat", "kodeks", "modda", "qaror", "farmon", "tartib", "jazo", "ayblov", "huquqbuzarlik", "konstitutsiya", "adliya", "mahkama", "sudya", "guvoh", "ariza", "shikoyat", "qamoq", "ozodlik", "mahkum", "tergov", "bayonnoma", "vakolat", "majburiyat", "bitim", "shartnoma", "fuqaro", "davlat", "hokimiyat", "ma'muriy", "fuqarolik", "jinoiy", "iqtisodiy", "hakamlik", "notarius", "guvohnoma", "pasport", "viza", "chegara", "bojxona", "soliq", "inspeksiya", "nazorat", "ijro", "byuro", "majburiy"]
  },
  iqtisod: {
    id: 'iqtisod',
    label: 'Iqtisod',
    color: '#4ecf8a',
    description: 'Economy, finance, business',
    words: ["iqtisod", "moliya", "bank", "pul", "valyuta", "bozor", "savdo", "eksport", "import", "soliq", "budjet", "investitsiya", "tadbirkor", "biznes", "foyda", "zarar", "narx", "inflyatsiya", "kredit", "qarz", "aksiya", "birja", "daromad", "xarajat", "sanoat", "qishloq", "xizmat", "ishlab", "chiqarish", "iste'mol", "raqobat", "shartnoma", "bitim", "tovar", "mahsulot", "xizmatlar", "bojxona", "fond", "kapital", "aktiv", "passiv", "balans", "hisobot", "audit", "buxgalteriya", "to'lov", "o'tkazma", "plastik", "karta", "terminal"]
  },
  jamiyat: {
    id: 'jamiyat',
    label: 'Jamiyat',
    color: '#f07b40',
    description: 'Society, culture, family',
    words: ["jamiyat", "madaniyat", "oila", "mahalla", "yoshlar", "xotin-qizlar", "an'ana", "qadriyat", "bayram", "san'at", "teatr", "kino", "musiqa", "adabiyot", "til", "tarix", "ma'naviyat", "ma'rifat", "xayriya", "ko'mak", "yordam", "birdamlik", "tinchlik", "barqarorlik", "aholi", "demografiya", "din", "e'tiqod", "urf-odat", "meros", "millat", "xalq", "vatan", "mustaqillik", "erkinlik", "tenglik", "adolat", "inson", "shaxs", "bolalar", "qariyalar", "nogironlar", "ijtimoiy", "himoya", "nafaqa", "pensiya", "ishsizlik", "bandlik"]
  },
  talim: {
    id: 'talim',
    label: 'Ta\'lim',
    color: '#b97cf7',
    description: 'Education, science',
    words: ["ta'lim", "fan", "maktab", "universitet", "institut", "kollej", "litsey", "o'quvchi", "talaba", "o'qituvchi", "professor", "dars", "kitob", "darslik", "bilim", "malaka", "ko'nikma", "tadqiqot", "laboratoriya", "imtihon", "test", "baho", "diplom", "sertifikat", "akademiya", "magistratura", "bakalavriat", "pedagogika", "psixologiya", "metodika", "o'qish", "yozish", "savodxonlik", "ma'lumot", "oliy", "o'rta", "maxsus", "maktabgacha", "tarbiya", "ustoz", "shogird", "kurs", "seminar", "konferensiya", "maqola", "dissertatsiya"]
  },
  texnologiyalar: {
    id: 'texnologiyalar',
    label: 'Texnologiyalar',
    color: '#38c9d4',
    description: 'Technology, IT, digital',
    words: ["texnologiya", "internet", "kompyuter", "dastur", "sayt", "mobil", "aloqa", "raqamli", "innovatsiya", "robot", "sun'iy", "intellekt", "tarmoq", "server", "ma'lumot", "baza", "xavfsizlik", "kiber", "smartfon", "gadjet", "dasturlash", "kod", "algoritmlar", "platforma", "bulutli", "tizim", "qurilma", "elektronika", "avtomatlashtirish", "muhandislik", "it", "ayti", "veb", "ilova", "soft", "apparat", "protsessor", "xotira", "ekran", "displey", "klaviatura", "sichqoncha", "printer", "skaner", "kamera", "wi-fi", "bluetooth"]
  },
  sport: {
    id: 'sport',
    label: 'Sport',
    color: '#f2545b',
    description: 'Sports',
    words: ["sport", "futbol", "boks", "kurash", "tennis", "shaxmat", "olimpiada", "chempionat", "musobaqa", "jamoa", "murabbiy", "hakam", "stadion", "maydon", "g'alaba", "mag'lubiyat", "rekord", "medal", "kubok", "turnir", "gimnastika", "suzish", "yengil", "atletika", "og'ir", "basketbol", "voleybol", "regbi", "dzyudo", "karate", "taekvondo", "suzish", "velosport", "shashka", "bilard", "ot", "poyga", "avtopoyga", "velosiped", "to'p", "raketka", "setka", "darvoza", "gol", "ochko"]
  },
  boshqa: {
    id: 'boshqa',
    label: 'Boshqa',
    color: '#515468',
    description: 'Other categories',
    words: []
  }
};

export const EXAMPLES = [
  {
    title: "Namuna 1",
    text: "O'zbekiston Respublikasi Konstitutsiyasi qonun ustuvorligini ta'minlaydi. Sud tizimi mustaqilligi huquqiy davlatning asosiy belgisidir. Jinoyat kodeksi va ma'muriy javobgarlik to'g'risidagi kodekslar jamiyatda tartibni saqlashga xizmat qiladi."
  },
  {
    title: "Namuna 2",
    text: "Raqamli iqtisodiyot sharoitida texnologiyalar va innovatsiyalar muhim rol o'ynaydi. Sun'iy intellekt va blokcheyn tizimlari bank moliya sohasini tubdan o'zgartirmoqda. Dasturlash tillarini o'rganish yoshlar uchun yangi imkoniyatlar ochadi."
  },
  {
    title: "Namuna 3",
    text: "Sport bilan shug'ullanish sog'lom turmush tarzining asosi hisoblanadi. Futbol, boks va kurash bo'yicha o'zbek sportchilari xalqaro musobaqalarda yuqori natijalarni qo'lga kiritmoqdalar. Olimpiada o'yinlarida medallar soni ortib bormoqda."
  }
];
