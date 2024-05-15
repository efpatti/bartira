import { BrowserRouter } from "react-router-dom";
import { Router } from "./Routes";
import { ToastContainer } from "react-toastify";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

export function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Router />
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
}
