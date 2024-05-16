import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Conta/Login";
import { LogadoFuncionario, LogadoAdm } from "./Pages/Conta/Logado";
import Financeiro from "./Pages/Financeiro";
import DashBoardProdutos from "./Pages/DashBoardProdutos";
import Usuarios from "./Pages/Usuarios";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import {
  PrivateRoutesFuncionario,
  PrivateRoutesAdm,
} from "./utils/PrivateRoutes";

export function Router() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route element={<PrivateRoutesFuncionario />}>
          <Route path="/logado-funcionario" element={<LogadoFuncionario />} />
          <Route path="/produtos" element={<DashBoardProdutos />} />
        </Route>
        <Route element={<PrivateRoutesAdm />}>
          <Route path="/logado-adm" element={<LogadoAdm />} />
          <Route path="/produtos" element={<DashBoardProdutos />} />
          <Route path="/financeiro" element={<Financeiro />} />
        </Route>
        <Route path="/" element={<Login />} exact />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
      <Footer />
    </>
  );
}
