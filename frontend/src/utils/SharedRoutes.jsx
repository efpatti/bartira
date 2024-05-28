import { Outlet, Navigate } from "react-router-dom";

const SharedRoutes = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default SharedRoutes;
