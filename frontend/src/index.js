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
import PrivateRoute from "./Route/PrivateRoute";
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
        element: (
          <PrivateRoute>
            <Vendas></Vendas>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashBoard></DashBoard>
          </PrivateRoute>
        ),
      },
      {
        path: "/financeiro",
        element: (
          <PrivateRoute>
            <Financeiro></Financeiro>
          </PrivateRoute>
        ),
      },
      {
        path: "/funcionarios",
        element: (
          <PrivateRoute>
            <Funcionarios></Funcionarios>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashBoard></DashBoard>
          </PrivateRoute>
        ),
      },
      {
        path: "/uteis",
        element: (
          <PrivateRoute>
            <Uteis></Uteis>
          </PrivateRoute>
        ),
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
