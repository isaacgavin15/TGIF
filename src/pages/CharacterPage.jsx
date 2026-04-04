import { useState } from "react";
import characters from "../data/characters.json";
import { useLottery } from "../hooks/useLottery";
import { t } from "../i18n";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Logo from "../components/Logo";
import FooterLogo from "../components/FooterLogo";

export default function CharacterPage() {
  const [lang, setLang] = useState("en");
  const { current, isSpinning, isDone, spin } = useLottery(characters);

  const footerVariant = isSpinning ? "spinning" : isDone ? "hidden" : "idle";

  return (
    <div className="page">
      <LanguageSwitcher lang={lang} setLang={setLang} />

      <Logo />

      {!isDone && !isSpinning && (
        <button className="action-btn" onClick={() => spin()}>
          {t(lang, "getCharacter")}
        </button>
      )}

      {(isSpinning || isDone) && current && (
        <div className={`lottery-display ${isSpinning ? "spinning" : "done"}`}>
          {current.name[lang]}
        </div>
      )}

      {isDone && current && (
        <div className="result-card character-card">
          <img src={current.image} alt={current.name[lang]} />
          <h3 className="trait-title">{t(lang, "Traits for you to build this week :")}</h3>
          <ul>
            {current.traits[lang].map((trait) => (
              <li key={trait}>{trait}</li>
            ))}
          </ul>
        </div>
      )}

      <FooterLogo variant={footerVariant} />
    </div>
  );
}
