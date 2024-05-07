import { Outlet, Navigate } from "react-router-dom";

const RotasPrivadasFuncionario = () => {
  const token = localStorage.getItem("token_funcionario");
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default RotasPrivadasFuncionario;
