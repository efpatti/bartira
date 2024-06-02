import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RoutesClient = () => {
  const { userType, isAuthenticated } = useAuth();

  return isAuthenticated && userType === "Cliente" && <Outlet />;
};

export default RoutesClient;
