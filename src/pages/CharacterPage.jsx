import { useState } from "react";
import characters from "../data/characters.json";
import { useLottery } from "../hooks/useLottery";
import { t } from "../i18n";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function CharacterPage() {
  const [lang, setLang] = useState("en");
  const { current, isSpinning, isDone, spin } = useLottery(characters);

  return (
    <div className="page">
      <LanguageSwitcher lang={lang} setLang={setLang} />

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
          <h2>{current.name[lang]}</h2>
          <h3>{t(lang, "traits")}</h3>
          <ul>
            {current.traits[lang].map((trait) => (
              <li key={trait}>{trait}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
