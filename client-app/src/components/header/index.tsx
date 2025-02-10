import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectAppLanguage,
  setLanguage,
} from "../../redux/features/languageSlice";
import { useEffect } from "react";
import LogoutButton from "./logout-button";
import "./index.css";

const Header = () => {
  const { i18n } = useTranslation();
  const currentLanguage = useAppSelector(selectAppLanguage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(event.target.value));
  };

  return (
    <div className="header">
      <div className="header-logo">
        Twilight Cyber <span className="accented">API</span>
      </div>
      <div className="language-selector">
        <LogoutButton />
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
  );
};

export default Header;
