import NavBar from "./Components/NavBar";
import DashBoard from "./Pages/DashBoard";
import Funcionarios from "./Pages/Funcionarios";
import Home from "./Pages/Home";
import Vendas from "./Pages/Vendas";
import Financeiro from "./Pages/Financeiro";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/funcionarios" element={<Funcionarios />} />
          <Route path="/vendas" element={<Vendas />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/produtos" element={<DashBoard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
