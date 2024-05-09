import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoutesFuncionario = () => {
  const token_funcionario = localStorage.getItem("token_funcionario");
  return token_funcionario ? <Outlet /> : <Navigate to="/" />;
};

export const PrivateRoutesAdm = () => {
  const token_adm = localStorage.getItem("token_adm");
  return token_adm ? <Outlet /> : <Navigate to="/" />;
};
