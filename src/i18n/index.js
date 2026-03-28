const translations = {
  en: {
    getVerse: "Get The Verse",
    getCharacter: "Get Your Bible Character",
    loading: "Loading...",
    error: "Something went wrong. Please try again.",
    traits: "Traits",
  },
  id: {
    getVerse: "Dapatkan Ayat",
    getCharacter: "Dapatkan Karakter Alkitabmu",
    loading: "Memuat...",
    error: "Terjadi kesalahan. Silakan coba lagi.",
    traits: "Sifat",
  },
};

export const t = (lang, key) => translations[lang]?.[key] ?? key;
