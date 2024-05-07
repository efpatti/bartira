import { useState } from "react";
import axios from "axios";
import { Flex, Button, Box, Input, Link } from "@chakra-ui/react";
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
    <Box
      w="100%"
      height="95vh"
      d="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        w="400px"
        h="400px"
        justifyContent="space-around"
        alignItems="center"
        border="3px"
        borderColor="white"
        borderStyle="solid"
        borderRadius="25px"
        flexDirection="column"
        bg="rgb(123, 54, 244)"
        p="10px"
      >
        <Flex w="90%" alignItems="center" justifyContent="space-around">
          {isAuthenticated ? (
            <>
              <Box d="flex" w="50%" gap="10px">
                <FaUser size={20} style={{ marginRight: "0px" }} />
                <div>{username}</div>
              </Box>
              <Box d="flex" w="50%" gap="10px">
                <Button
                  textDecoration="none"
                  color="black"
                  bg="white"
                  fontSize="12px"
                  borderRadius="15px"
                  textAlign="center"
                  p="2"
                  d="flex"
                  alignItems="center"
                  justifyContent="center"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box d="flex" w="50%" gap="10px">
                <FaUser size={20} style={{ marginRight: "0px" }} /> {"Usuário"}
              </Box>
              <Flex w="50%" alignItems="center" justifyContent="flex-end" />
            </>
          )}
        </Flex>

        <Flex
          w="85%"
          h="320px"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          border="2px"
          borderColor="black"
          borderStyle="solid"
          borderRadius="25px"
          gap="10px"
        >
          <h1>LOGIN</h1>
          <Input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isAuthenticated}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isAuthenticated}
          />
          <Button
            onClick={handleLogin}
            textDecoration="none"
            bg="white"
            color="black"
            p="2"
            borderRadius="15px"
            textAlign="center"
          >
            Login
          </Button>
          <Button
            textDecoration="none"
            color="black"
            bg="white"
            p="2"
            borderRadius="15px"
            textAlign="center"
          >
            <Link to="/register">Registre-se</Link>
          </Button>
          <Button
            onClick={ProtectedRoute}
            textDecoration="none"
            color="black"
            bg="white"
            p="2"
            borderRadius="15px"
            textAlign="center"
          >
            <Link to="/logged">Private Route</Link>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
