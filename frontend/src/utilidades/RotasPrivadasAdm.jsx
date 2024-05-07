import { Outlet, Navigate } from "react-router-dom";

const RotasPrivadasFuncionario = () => {
  const token = localStorage.getItem("token_adm");
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default RotasPrivadasFuncionario;
