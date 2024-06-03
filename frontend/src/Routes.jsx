import React from "react";
import { Route, Routes } from "react-router-dom";

// Components
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

// Pages
import Login from "./Pages/Conta/Login";
import Logado from "./Pages/Conta/Logado";
import Financeiro from "./Pages/Financeiro";
import DashBoardProdutos from "./Pages/DashBoardProdutos";
import Usuarios from "./Pages/Usuarios";
import Vendas from "./Pages/Vendas";
import Perfil from "./Pages/Conta/Perfil";
import Fornecedores from "./Pages/Fornecedores";
import Clientes from "./Pages/Clientes";
import NotFound from "./Pages/NotFound";

// Utilities
import PrivateRoutes from "./utils/PrivateRoutes";
import SharedRoutesFuncAdm from "./utils/SharedRoutesFuncAdm";
import SharedRoutes from "./utils/SharedRoutes";
import RoutesClient from "./utils/RoutesClient";

import { Box, useColorMode } from "@chakra-ui/react";
import { useAuth } from "./hooks/useAuth";

const routes = [
  {
    routeType: SharedRoutes,
    childrens: [
      { path: "/perfil", element: <Perfil /> },
      { path: "/logado", element: <Logado /> },
    ],
  },
  {
    routeType: SharedRoutesFuncAdm,
    childrens: [
      { path: "/produtos", element: <DashBoardProdutos /> },
      { path: "/fornecedores", element: <Fornecedores /> },
      { path: "/vendas", element: <Vendas /> },
      { path: "/usuarios", element: <Usuarios /> },
    ],
  },
  {
    routeType: RoutesClient,
    childrens: [{ path: "/clientes", element: <Clientes /> }],
  },
  {
    routeType: PrivateRoutes,
    childrens: [{ path: "/financeiro", element: <Financeiro /> }],
  },
];

export function Router() {
  const bgA = {
    backgroundRepeat: "no-repeat",
    background: "black",
  };
  const { sideBarClicada } = useAuth();
  const { colorMode } = useColorMode();
  return (
    <>
      <NavBar />
      <Box
        mt="64px"
        id="espaco-nav"
        filter="auto"
        blur={sideBarClicada ? "2px" : ""}
        transition="all 0.3s"
      >
        <Routes>
          {routes.map((route, i) => (
            <Route key={i} element={<route.routeType />}>
              {route.childrens.map((child, index) => (
                <Route key={index} path={child.path} element={child.element} />
              ))}
            </Route>
          ))}
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Login />} exact />
        </Routes>
      </Box>
      <Footer />
    </>
  );
}
