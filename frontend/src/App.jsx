import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Router } from "./Routes";
import { ToastContainer } from "react-toastify";
import DashBoard from "./Pages/DashBoard";
import Financeiro from "./Pages/Financeiro";
import Funcionarios from "./Pages/Funcionarios";

export function App() {
  return (
    <BrowserRouter>
      <Router />
      <ToastContainer />
      {/* <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
      </Routes> */}
    </BrowserRouter>
  );
}
