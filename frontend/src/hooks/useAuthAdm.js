import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export function useAuthAdm() {
  const [isAuthenticatedAdm, setIsAuthenticatedAdm] = useState(false);
  const [userAdm, setUserAdm] = useState(null);

  console.log(userAdm);

  useEffect(() => {
    const token_adm = localStorage.getItem("token_adm");

    if (token_adm) {
      const decodedToken = jwtDecode(token_adm);

      if (decodedToken.exp * 1000 < Date.now()) {
        logoutAdm();
      } else {
        setIsAuthenticatedAdm(true);
        setUserAdm(decodedToken.email_adm);
      }
    }
  }, []);

  const loginAdm = (token_adm) => {
    handleVerify(token_adm);
  };

  const logoutAdm = () => {
    localStorage.removeItem("token_adm");
    setIsAuthenticatedAdm(false);
    setUserAdm(null);
  };

  const handleVerify = (token_adm) => {
    axios
      .get("http://localhost:8080/protegidoAdm", {
        headers: {
          Authorization: `Bearer ${token_adm}`,
        },
      })
      .then((response) => {
        const decodedToken = jwtDecode(token_adm);

        if (decodedToken.exp * 1000 < Date.now()) {
          console.error("Token inválido");
          return;
        }

        localStorage.setItem("token_adm", token_adm);
        setIsAuthenticatedAdm(true);
        setUserAdm(decodedToken.email_adm);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  return {
    isAuthenticatedAdm,
    userAdm,
    loginAdm,
    logoutAdm,
  };
}
