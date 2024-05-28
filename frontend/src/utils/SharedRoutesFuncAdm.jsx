import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SharedRoutes = () => {
  const { userType } = useAuth();
  const token =
    localStorage.getItem("token") &&
    (userType === "Administrador" || userType === "Funcionário");

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default SharedRoutes;
