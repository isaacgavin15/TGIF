import { useState } from "react";
import verseList from "../data/verses.json";
import { useLottery } from "../hooks/useLottery";
import { t } from "../i18n";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Logo from "../components/Logo";
import FooterLogo from "../components/FooterLogo";

const formatRef = (entry) =>
  `${entry.book} ${entry.chapter}:${entry.verses.join(",")}`;

const fetchVerse = async (entry) => {
  const responses = await Promise.all(
    entry.verses.map((v) =>
      fetch(`https://bible-api.com/${entry.book}+${entry.chapter}:${v}`).then(
        (res) => {
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          return res.json();
        }
      )
    )
  );
  return {
    reference: formatRef(entry),
    text: responses.map((r) => r.text.trim()).join(" "),
  };
};

export default function VersePage() {
  const [lang, setLang] = useState("en");
  const [verseData, setVerseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { current, isSpinning, isDone, spin } = useLottery(verseList);

  const footerVariant = isSpinning ? "spinning" : isDone ? "verseDone" : "idle";

  const handleClick = () => {
    setError(null);
    spin(async (selected) => {
      setLoading(true);
      try {
        setVerseData(await fetchVerse(selected));
      } catch {
        setError(t(lang, "error"));
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="page">
      <LanguageSwitcher lang={lang} setLang={setLang} />

      <Logo />

      {!isDone && !isSpinning && (
        <button className="action-btn" onClick={handleClick}>
          {t(lang, "getVerse")}
        </button>
      )}

      {(isSpinning || isDone) && current && (
        <div className={`lottery-display ${isSpinning ? "spinning" : "done"}`}>
          {formatRef(current)}
        </div>
      )}

      {(isSpinning || loading) && <p className="loading">{t(lang, "loading")}</p>}
      {error && <p className="error">{error}</p>}

      {verseData && !loading && (
        <div className="result-card">
          <p>{verseData.text}</p>
        </div>
      )}
      <FooterLogo variant={footerVariant} />
    </div>
  );
}
