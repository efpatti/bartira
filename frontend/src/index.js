import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Administrador from "./Pages/Administrador";
import Home from "./Pages/Home";
import Uteis from "./Pages/Uteis";
import Financeiro from "./Pages/Financeiro";
import DashBoard from "./Pages/DashBoard";
import Vendas from "./Pages/Vendas";
import Funcionarios from "./Pages/Funcionarios";
import Login from "./Pages/Login";
import AuthProvider from "./Components/Provider/AuthProvider";
// import PrivateRoute from "./Route/PrivateRoute";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Administrador></Administrador>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/vendas",
        element: <Vendas></Vendas>,
      },
      {
        path: "/dashboard",
        element: <DashBoard></DashBoard>,
      },
      {
        path: "/financeiro",
        element: <Financeiro></Financeiro>,
      },
      {
        path: "/funcionarios",
        element: <Funcionarios></Funcionarios>,
      },
      {
        path: "/dashboard",
        element: <DashBoard></DashBoard>,
      },
      {
        path: "/uteis",
        element: <Uteis></Uteis>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <AuthProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
