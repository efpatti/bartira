import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { userType } = useAuth();
  const token = localStorage.getItem("token");

  return token && userType === "Administrador" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
