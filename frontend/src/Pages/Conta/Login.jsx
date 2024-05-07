import { useState } from "react";
import axios from "axios";
import { Flex, Button, Box, Input, Link } from "@chakra-ui/react";
import { useAuthFuncionario } from "../../hooks/useAuthFuncionario";
import { useAuthAdm } from "../../hooks/useAuthAdm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa";

export function Login() {
  const [email_funcionario, setEmailFuncionario] = useState("");
  const [senha_funcionario, setSenhaFuncionario] = useState("");
  const [email_adm, setEmailAdm] = useState("");
  const [senha_adm, setSenhaAdm] = useState("");

  const { loginFuncionario, logoutFuncionario, isAuthenticatedFuncionario } =
    useAuthFuncionario();
  const { loginAdm, logoutAdm, isAuthenticatedAdm } = useAuthAdm();

  const handleLogout = () => {
    if (isAuthenticatedFuncionario) {
      logoutFuncionario();
    } else if (isAuthenticatedAdm) {
      logoutAdm();
    }
    clearFields();
    toast.warn("Você saiu!");
  };

  const clearFields = () => {
    setEmailFuncionario("");
    setSenhaFuncionario("");
    setEmailAdm("");
    setSenhaAdm("");
  };

  const handleLogin = () => {
    if (email_funcionario && senha_funcionario) {
      axios
        .post("http://localhost:8080/loginFuncionario", {
          email_funcionario,
          senha_funcionario,
        })
        .then((res) => {
          const { token } = res.data;
          loginFuncionario(token);
          toast.success("Login feito com sucesso!");
          toast.success("Token válido, agora você tem acesso!");
        })
        .catch(() => {
          axios
            .post("http://localhost:8080/loginAdm", {
              email_adm,
              senha_adm,
            })
            .then((res) => {
              const { token } = res.data;
              loginAdm(token);
              toast.success("Login feito com sucesso!");
              toast.success("Token válido, agora você tem acesso!");
            })
            .catch((err) => {
              toast.error(err.response.data.message);
            });
        });
    } else {
      toast.error("Se você não tem uma conta, registre-se!");
      toast.warn("Preencha todos os campos!");
    }
  };

  const ProtectedRoute = () => {
    const token = localStorage.getItem("token_funcionario");
    console.log(token);
    if (token) {
      toast.success("Seu token é válido");
    } else {
      ProtectedRouteAdm();
    }
  };

  const ProtectedRouteAdm = () => {
    const token = localStorage.getItem("token_adm");
    console.log(token);
    if (token) {
      toast.success("Seu token é válido");
    } else {
      toast.error("Sem acesso a rota");
      toast.error("Registre-se e faça login para acessar esta rota!");
      toast.error("Você foi direcionado para a página de registro.");
    }
  };

  return (
    <Flex height="95vh" d="flex" justify="center" align="center">
      <Flex boxSize="lg" borderRadius="25px" flexDirection="column" p="10px">
        <Flex w="90%" align="center" justify="space-around">
          {isAuthenticatedFuncionario ? (
            <>
              <Box d="flex" w="50%" gap="10px">
                <FaUser size={20} style={{ marginRight: "0px" }} />
                <div>{email_funcionario}</div>
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
          ) : isAuthenticatedAdm ? (
            <>
              <Box d="flex" w="50%" gap="10px">
                <FaUser size={20} style={{ marginRight: "0px" }} />
                <div>{email_adm}</div>
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
              <Box d="flex" w="50%" gap="10px">
                <FaUser size={20} style={{ marginRight: "0px" }} /> {"Email"}
              </Box>
            </>
          )}
        </Flex>

        <Flex
          w="85%"
          h="320px"
          align="center"
          flexDirection="column"
          justify="center"
          border="2px"
          borderColor="black"
          borderStyle="solid"
          borderRadius="25px"
          gap="10px"
        >
          <h1>LOGIN</h1>
          <Input
            type="text"
            placeholder="Email"
            value={email_funcionario}
            onChange={(e) => setEmailFuncionario(e.target.value)}
            disabled={isAuthenticatedFuncionario || isAuthenticatedAdm}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={senha_funcionario}
            onChange={(e) => setSenhaFuncionario(e.target.value)}
            disabled={isAuthenticatedFuncionario || isAuthenticatedAdm}
          />
          <Button onClick={handleLogin}>Login</Button>
          <Link href="/registre-se">
            <Button>Registre-se</Button>
          </Link>
          <Link href="/logado">
            <Button onClick={ProtectedRoute}>Rota Privada</Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
