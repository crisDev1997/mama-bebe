import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../Context/UserContext/useUserContext";
export const ProtectedRoutes = () => {
  const {isAuth} = useUserContext();
  return isAuth ? <Outlet /> : <Navigate to="/auth/login" />;
}
