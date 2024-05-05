import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import NavBar from "./Components/NavBar"
import DashBoard from "./Pages/DashBoard"
import Funcionarios from "./Pages/Funcionarios"
import Financeiro from "./Pages/Financeiro"
function App() {
   return (
      <Router>
         <NavBar />
      <Routes>
         <Route index element={<Home />} />
         <Route path="/dashboard" element={<DashBoard />} />
         <Route path="/funcionarios" element={<Funcionarios />} />
         <Route path="/financeiro" element={<Financeiro />} />
      </Routes>
      </Router>
   )
}

export default App