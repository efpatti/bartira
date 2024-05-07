import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export function useAuthFuncionario() {
  const [isAuthenticatedFuncionario, setIsAuthenticatedFuncionario] =
    useState(false);
  const [userFuncionario, setUserFuncionario] = useState(null);

  console.log(userFuncionario);

  useEffect(() => {
    const token_funcionario = localStorage.getItem("token_funcionario");

    if (token_funcionario) {
      const decodedToken = jwtDecode(token_funcionario);

      if (decodedToken.exp * 1000 < Date.now()) {
        logoutFuncionario();
      } else {
        setIsAuthenticatedFuncionario(true);
        setUserFuncionario(decodedToken.email_funcionario);
      }
    }
  }, []);

  const loginFuncionario = (token_funcionario) => {
    handleVerify(token_funcionario);
  };

  const logoutFuncionario = () => {
    localStorage.removeItem("token_funcionario");
    setIsAuthenticatedFuncionario(false);
    setUserFuncionario(null);
  };

  const handleVerify = (token_funcionario) => {
    axios
      .get("http://localhost:8080/protegidoFuncionario", {
        headers: {
          Authorization: `Bearer ${token_funcionario}`,
        },
      })
      .then((response) => {
        const decodedToken = jwtDecode(token_funcionario);

        if (decodedToken.exp * 1000 < Date.now()) {
          console.error("Token inválido");
          return;
        }

        localStorage.setItem("token_funcionario", token_funcionario);
        setIsAuthenticatedFuncionario(true);
        setUserFuncionario(decodedToken.email_funcionario);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  return {
    isAuthenticatedFuncionario,
    userFuncionario,
    loginFuncionario,
    logoutFuncionario,
  };
}
