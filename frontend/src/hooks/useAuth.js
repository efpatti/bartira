// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Seu token é ", token);
    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
      } else {
        setIsAuthenticated(true);
        setUser(decodedToken);
        setUserType(getUserType(decodedToken)); // Aqui você define o userType
      }
    }
  }, []);

  const getUserType = (decodedToken) => {
    if (decodedToken.tipo === "Administrador") {
      return "Administrador";
    } else {
      return "Funcionário";
    }
  };

  const login = (token) => {
    handleVerify(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    setUserType(null);
  };

  const handleVerify = (token) => {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
      console.error("Token inválido");
      return;
    }

    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setUser(decodedToken);
    setUserType(getUserType(decodedToken));
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, userType, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
