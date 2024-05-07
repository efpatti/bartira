import { Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Conta/Login";
import { LogadoFuncionario } from "./Pages/Conta/LogadoFuncionario";
import { LogadoAdm } from "./Pages/Conta/LogadoAdm";
import Financeiro from "./Pages/Financeiro";
import DashBoard from "./Pages/DashBoard";
import RotasPrivadasFuncionario from "./utilidades/RotasPrivadasFuncionario";
import RotasPrivadasAdm from "./utilidades/RotasPrivadasAdm";
import Funcionarios from "./Pages/Funcionarios";
import Administradores from "./Pages/Administradores";

export function Router() {
  return (
    <Routes>
      <Route element={<RotasPrivadasFuncionario />}>
        <Route path="/logado-funcionario" element={<LogadoFuncionario />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/produtos" element={<DashBoard />} />
      </Route>
      <Route element={<RotasPrivadasAdm />}>
        <Route path="/logado-adm" element={<LogadoAdm />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/produtos" element={<DashBoard />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
      </Route>
      <Route path="/" element={<Login />} exact />
      <Route path="/administradores" element={<Administradores />} />
    </Routes>
  );
}
