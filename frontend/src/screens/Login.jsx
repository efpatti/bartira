import { useState } from "react";
import axios from "axios";
import {
  ButtonLink,
  ButtonLogout,
  ButtonLogoutArea,
  Container,
  ContainerLogin,
  InputArea,
  LoggedArea,
  LoggedAreaText,
  LoginArea,
} from "../styles";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    clearFields();
    toast.warn("Você saiu!");
  };

  const clearFields = () => {
    setUsername("");
    setPassword("");
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:8080/login", { username, password })
      .then((res) => {
        const { token } = res.data;
        login(token);
        toast.success("Login feito com sucesso!");
        toast.success("Token válido, agora você tem acesso!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        toast.error("Se você não tem uma conta, registre-se!");
      });
  };

  const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      toast.success("Seu token é válido");
    } else {
      toast.error("Sem acesso a rota");
      toast.error("Registre-se e faça login para acessar esta rota!1");
      toast.error("Você foi direcionado para página de registro.");
    }
  };

  return (
    <Container>
      <ContainerLogin>
        <LoggedArea>
          {isAuthenticated ? (
            <>
              <LoggedAreaText>
                <FaUser size={20} style={{ marginRight: "0px" }} />
                <div>{username}</div>
              </LoggedAreaText>
              <ButtonLogoutArea>
                <ButtonLogout onClick={handleLogout}>Logout</ButtonLogout>
              </ButtonLogoutArea>
            </>
          ) : (
            <>
              <LoggedAreaText>
                <FaUser size={20} style={{ marginRight: "0px" }} /> {"Usuário"}
              </LoggedAreaText>
              <ButtonLogoutArea />
            </>
          )}
        </LoggedArea>

        <LoginArea>
          <h1>LOGIN</h1>
          <InputArea
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isAuthenticated}
          />
          <InputArea
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isAuthenticated}
          />
          <ButtonLink onClick={handleLogin}>Login</ButtonLink>
          <ButtonLink to="/register">Registre-se</ButtonLink>
          <ButtonLink to="/logged" onClick={ProtectedRoute}>
            Private Route
          </ButtonLink>
        </LoginArea>
      </ContainerLogin>
    </Container>
  );
}
