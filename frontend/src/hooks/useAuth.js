import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export function useAuth() {
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
  }, [isAuthenticated]); // Adicionando userType como dependência

  const getUserType = (decodedToken) => {
    if (decodedToken.tipo === "Administrador") {
      return "Administrador";
    } else {
      return "Funcionário";
    }
  };

  const login = (token) => {
    handleVerify(token);
    setIsAuthenticated(true); // Definindo isAuthenticated como true após o login bem-sucedido
    setInterval(function () {
      window.location.reload();
    }, 5000);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    setUserType(null);
    setInterval(function () {
      window.location.reload();
    }, 5000);
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

    axios
      .get("http://localhost:8081/protegido", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data);
        console.log("Sem token");
      });
  };

  console.log(userType);

  return {
    isAuthenticated,
    user,
    userType,
    login,
    logout,
  };
}
