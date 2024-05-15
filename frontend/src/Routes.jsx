import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Conta/Login";
import { LogadoFuncionario, LogadoAdm } from "./Pages/Conta/Logado";
import Financeiro from "./Pages/Financeiro";
import DashBoardProdutos from "./Pages/DashBoardProdutos";
import Usuarios from "./Pages/Usuarios";
import {
  PrivateRoutesFuncionario,
  PrivateRoutesAdm,
} from "./utils/PrivateRoutes";

export function Router() {
  return (
    <Routes>
      <Route element={<PrivateRoutesFuncionario />}>
        <Route path="/logado-funcionario" element={<LogadoFuncionario />} />
        <Route path="/produtos" element={<DashBoardProdutos />} />
      </Route>
      <Route element={<PrivateRoutesAdm />}>
        <Route path="/logado-adm" element={<LogadoAdm />} />
        <Route path="/produtos" element={<DashBoardProdutos />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Route>
      <Route path="/" element={<Login />} exact />
    </Routes>
  );
}
