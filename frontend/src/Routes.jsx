import { Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Conta/Login";
import { RegistreSe } from "./Pages/Conta/RegistreSe";
import { Logado } from "./Pages/Conta/Logado";
import Financeiro from "./Pages/Financeiro";
import DashBoard from "./Pages/DashBoard";
import PrivateRoutes from "./utils/PrivateRoutes";

export function Router() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/logado" element={<Logado />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/produtos" element={<DashBoard />} />
      </Route>
      <Route path="/" element={<Login />} exact />
      <Route path="/registre-se" element={<RegistreSe />} />
    </Routes>
  );
}
