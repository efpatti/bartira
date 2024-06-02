import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { isAuthenticated, userType } = useAuth();

  return isAuthenticated && userType === "Administrador" && (
    <Outlet />
  ) 
};

export default PrivateRoutes;
