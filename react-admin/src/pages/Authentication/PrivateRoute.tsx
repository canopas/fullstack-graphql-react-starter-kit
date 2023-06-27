import { Navigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

export const PrivateRoute = ({ children }: any) => {
  const [user, _] = useLocalStorage("user", "");

  if (user !== "") {
    return children;
  }

  return <Navigate to="/signIn" />;
};
