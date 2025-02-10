import { PropsWithChildren } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentAccessToken } from "../../redux/features/authSlice";
import LoginPage from "../../pages/login";

const Router: React.FC<PropsWithChildren> = ({ children }) => {
  const token = useAppSelector(selectCurrentAccessToken);

  if (token) {
    return <div className="app-body">{children}</div>;
  }

  return <LoginPage />;
};

export default Router;
