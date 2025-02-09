import { useTranslation } from "react-i18next";
import "./App.css";
import "./i18n/index";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectAppLanguage, setLanguage } from "./redux/features/languageSlice";
import { useEffect } from "react";

function App() {
  const { t, i18n } = useTranslation();
  const currentLanguage = useAppSelector(selectAppLanguage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(event.target.value));
  };

  return (
    <>
      <div className="header">
        <div className="header-logo">
          Twilight Cyber <span className="header-logo-accented">API</span>
        </div>
        <div className="language-selector">
          <select
            className="language-selector-select"
            onChange={changeLanguage}
            value={currentLanguage}
          >
            <option value="en">🇬🇧 ENG</option>
            <option value="ua">🇺🇦 UKR</option>
          </select>
        </div>
      </div>
      <div className="main">
        <h1 className="main-heading">{t("main.welcome")}</h1>
        <h5 className="main-description">{t("main.description")}</h5>
        <div className="main-input">
          <input
            className="main-input-input"
            type="text"
            placeholder="API Key"
          />
        </div>
        <div className="main-submit">
          <button className="main-submit-btn">{t("submit")}</button>
        </div>
      </div>
    </>
  );
}

export default App;
