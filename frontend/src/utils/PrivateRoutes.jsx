import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoutesFuncionario = () => {
  const { userType } = useAuth();
  const token = localStorage.getItem("token");

  return token && userType === "Funcionário" ? <Outlet /> : <Navigate to="/" />;
};

export const PrivateRoutesAdm = () => {
  const { userType } = useAuth();
  const token = localStorage.getItem("token");

  return token && userType === "Administrador" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};
