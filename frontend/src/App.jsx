import { BrowserRouter } from "react-router-dom";
import { Router } from "./Routes";
import { ToastContainer } from "react-toastify";
import NavBar from "./Components/NavBar";

export function App() {
  return (
    <BrowserRouter>
      <NavBar />
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
