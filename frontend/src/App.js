import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import NavBar from "./Components/NavBar"
import DashBoard from "./Pages/DashBoard"
import Funcionarios from "./Pages/Funcionarios"
function App() {
   return (
      <Router>
         <NavBar />
      <Routes>
         <Route index element={<Home />} />
         <Route path="/dashboard" element={<DashBoard />} />
         <Route path="/funcionarios" element={<Funcionarios />} />
      </Routes>
      </Router>
   )
}

export default App