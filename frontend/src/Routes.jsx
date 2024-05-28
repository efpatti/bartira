import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Conta/Login";
import Logado from "./Pages/Conta/Logado";
import Financeiro from "./Pages/Financeiro";
import DashBoardProdutos from "./Pages/DashBoardProdutos";
import Usuarios from "./Pages/Usuarios";
import Vendas from "./Pages/Vendas";
import NavBar from "./Components/NavBar";
import PrivateRoutes from "./utils/PrivateRoutes";
import Perfil from "./Pages/Conta/Perfil";
import SharedRoutesFuncAdm from "./utils/SharedRoutesFuncAdm";
import SharedRoutes from "./utils/SharedRoutesFuncAdm";
import Fornecedores from "./Pages/Fornecedores";
import Footer from "./Components/Footer";
import RoutesClient from "./utils/RoutesClient";
import Clientes from "./Pages/Clientes";

const routes = [
  {
    routeType: SharedRoutesFuncAdm,
    childrens: [
      {
        path: "/produtos",
        element: DashBoardProdutos,
      },
      {
        path: "/fornecedores",
        element: Fornecedores,
      },
      {
        path: "/vendas",
        element: Vendas,
      },
      {
        path: "/usuarios",
        element: Usuarios
      }

    ],
  },
  {
    routeType: RoutesClient,
    childrens: [
      {
        path: "/clientes",
        element: Clientes,
      },
    ],
  },
  {
    routeType: PrivateRoutes,
    childrens: [
      {
        path: "/financeiro",
        element: Financeiro,
      },
    ],
  },
  {
    routeType: SharedRoutes,
    childrens: [
      {
        path: "/perfil",
        element: Perfil,
      },
      {
        path: "/logado",
        element: Logado,
      },
    ],
  },
];

export function Router() {
  return (
    <>
      <NavBar />
      <Routes>
        {routes.map((routeType, i) => (
          <Route element={<routeType.routeType />} key={i}>
            {routeType.childrens.map((children, index) => (
              <Route
                path={children.path}
                element={<children.element />}
                key={index}
              />
            ))}
          </Route>
        ))}
        <Route path="/" element={<Login />} exact />
      </Routes>
      <Footer />
    </>
  );
}
