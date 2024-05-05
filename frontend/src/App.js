import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NavBar from "./Components/NavBar";
import DashBoard from "./Pages/DashBoard";
import Funcionarios from "./Pages/Funcionarios";
import Financeiro from "./Pages/Financeiro";
import Vendas from "./Pages/Vendas";
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/vendas" element={<Vendas />} />
      </Routes>
    </Router>
  );
}

export default App;
