import { Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Conta/Login";
import { LogadoFuncionario, LogadoAdm } from "./Pages/Conta/Logado";
import Financeiro from "./Pages/Financeiro";
import DashBoard from "./Pages/DashBoard";
import Administradores from "./Pages/Administradores";
import {
  PrivateRoutesFuncionario,
  PrivateRoutesAdm,
} from "./utils/PrivateRoutes";
import Funcionarios from "./Pages/Funcionarios";

export function Router() {
  return (
    <Routes>
      <Route element={<PrivateRoutesFuncionario />}>
        <Route path="/logado-funcionario" element={<LogadoFuncionario />} />
        <Route path="/produtos" element={<DashBoard />} />
        <Route path="/financeiro" element={<Financeiro />} />
      </Route>
      <Route element={<PrivateRoutesAdm />}>
        <Route path="/logado-adm" element={<LogadoAdm />} />
        <Route path="/produtos" element={<DashBoard />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
      </Route>
      <Route path="/" element={<Login />} exact />
      <Route path="/administradores" element={<Administradores />} />
    </Routes>
  );
}
