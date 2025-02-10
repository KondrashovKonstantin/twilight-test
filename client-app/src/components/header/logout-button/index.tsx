import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectCurrentAccessToken } from "../../../redux/features/authSlice";
import { setAccessToken } from "../../../redux/features/authSlice";

const Header = () => {
  const { t } = useTranslation();
  const token = useAppSelector(selectCurrentAccessToken);
  const dispatch = useAppDispatch();

  const removeToken = () => {
    dispatch(setAccessToken({ access_token: null }));
  };

  return (
    <>
      {token && (
        <button onClick={removeToken} className="logout-btn">
          {t("logout")}
        </button>
      )}
    </>
  );
};

export default Header;
