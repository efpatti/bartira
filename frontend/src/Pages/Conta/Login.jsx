import { useState } from "react";
import axios from "axios";
import { Flex, Button, Box, Input, Link, Avatar } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa";

const cargos = {
  "João": "Gerente",
  "Maria": "Analista",
  "Vitor Terribile dos Anjos": "Assistente"
};

export function Login() {
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
    <Flex height="95vh" d="flex" justify="center" align="center">
      <Flex boxSize="lg" borderRadius="25px" flexDirection="column" p="10px" >
        <Flex w="90%" align="center" justify="space-around" >
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
                  align="center"
                  justify="center"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box d="flex" w="60%" gap="10px" m={2}>
                <Avatar name={username} /> {username} <br /> {cargos[username] || 'Cargo'}
              </Box>
              <Flex w="50%" align="center" justify="flex-end" />
            </>
          )}
        </Flex>

        <Flex
          w="100%"
          h="400px"
          p={5}
          align="center"
          flexDirection="column"
          justify="center"
          border={0}
          borderColor="black"
          borderStyle="solid"
          borderRadius="25px"
          gap="10px"
          bg={"#ebf3f7"}
        >
          <h1><b>Login</b></h1>
          <Input
            type="text"
            placeholder="Usuário"
            bg={"white"}
            border={0}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isAuthenticated}
          />
          <Input
            type="password"
            placeholder="Senha"
            bg={"white"}
            border={0}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isAuthenticated}
          />
          <Button onClick={handleLogin}>Login</Button>
          <Link href="/registre-se">
            <Button>Registre-se</Button>
          </Link>

          <Link href="/logado">
            <Button onClick={ProtectedRoute}>Private Route</Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
