import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useLoginMutation } from "../../redux/api/auth.api";
import "./index.css";

const LoginPage = () => {
  const { t } = useTranslation();
  const [login, { isLoading }] = useLoginMutation();
  const [apiKey, setApiKey] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onLogin = async () => {
    login({ apiKey })
      .unwrap()
      .catch((error) => {
        console.log(error);
        setError(error.data.message);
      })
      .finally(() => {
        console.log("finally");
      });
  };

  return (
    <>
      <div className="main">
        <h1 className="main-heading">{t("main.welcome")}</h1>
        <h5 className="main-description">{t("main.description")}</h5>
        <div className="app-input">
          <input
            className="app-input-input"
            type="text"
            placeholder="API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          {error && (
            <span className="app-input-error">{t("main.loginError")}</span>
          )}
        </div>
        <div className="app-submit">
          <button onClick={onLogin} className="app-submit-btn">
            {t("submit")}
          </button>
        </div>
        {isLoading && <div className="main-loading">Loading...</div>}
      </div>
    </>
  );
};

export default LoginPage;
