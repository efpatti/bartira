import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SharedRoutesFuncAdm = () => {
  const { userType, isAuthenticated } = useAuth();

  const isColaborator = () => {
    if (isAuthenticated) {
      if (userType === "Administrador" || userType === "Funcionário") {
        return true;
      }
    }
    return false;
  };

  if (isColaborator()) {
    return <Outlet />;
  } 
};

export default SharedRoutesFuncAdm;
