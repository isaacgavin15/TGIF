export default function LanguageSwitcher({ lang, setLang }) {
  return (
    <button
      className="lang-switch"
      onClick={() => setLang(lang === "en" ? "id" : "en")}
    >
      {lang === "en" ? "🇮🇩 Indonesia" : "🇬🇧 English"}
    </button>
  );
}
