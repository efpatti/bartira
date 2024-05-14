import { useState } from "react";
import axios from "axios";
import {
  Flex,
  Button,
  Box,
  Input,
  Link,
  InputGroup,
  FormLabel,
  InputRightElement,
  useColorMode,
  Text,
  Icon,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useAuthFuncionario, useAuthAdm } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

export function Login() {
  const [email_funcionario, setEmailFuncionario] = useState("");
  const [senha_funcionario, setSenhaFuncionario] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [email_adm, setEmailAdm] = useState("");
  const [senha_adm, setSenhaAdm] = useState("");

  const { loginFuncionario, isAuthenticatedFuncionario } = useAuthFuncionario();
  const { loginAdm, isAuthenticatedAdm } = useAuthAdm();
  const [click, setClick] = useState(false);

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const { colorMode } = useColorMode();

  const handleEmailFocus = () => setEmailFocused(true);
  const handleEmailBlur = (e) => {
    if (!e.target.value) setEmailFocused(false);
  };
  const handlePasswordFocus = () => setPasswordFocused(true);
  const handlePasswordBlur = (e) => {
    if (!e.target.value) setPasswordFocused(false);
  };

  const handleClick = () => setClick(!click);

  // const clearFields = () => {
  //   setEmailFuncionario("");
  //   setEmailAdm("");
  //   setSenhaFuncionario("");
  //   setSenhaAdm("");
  // };

  const handleLogin = () => {
    axios
      .post("http://localhost:8080/loginAdm", {
        email_adm,
        senha_adm,
      })
      .then((res) => {
        const { token_adm } = res.data;
        loginAdm(token_adm);
        toast.success("Login feito com sucesso!");
        toast.success("Token válido, agora você tem acesso!");
      })
      .catch((err) => {
        handleLoginFuncionario();
      });
  };

  const handleLoginFuncionario = () => {
    axios
      .post("http://localhost:8080/loginFuncionario", {
        email_funcionario,
        senha_funcionario,
      })
      .then((res) => {
        const { token_funcionario } = res.data;
        loginFuncionario(token_funcionario);
        toast.success("Login feito com sucesso!");
        toast.success("Token válido, agora você tem acesso!");
      })
      .catch((err) => {
        setIsAdmin(true);
        toast.error(err.response.data.message);
        toast.error("Se você não tem uma conta, registre-se!");
      });
  };

  const ProtectedRoute2 = () => {
    const token_adm = localStorage.getItem("token_adm");
    if (token_adm) {
      toast.success("Seu token é válido");
    } else {
      toast.error("Sem acesso a rota");
      toast.error("Registre-se e faça login para acessar esta rota!");
      toast.error("Você foi direcionado para página de registro.");
    }
  };

  const ProtectedRoute = () => {
    const token_funcionario = localStorage.getItem("token_funcionario");
    if (token_funcionario) {
      toast.success("Seu token é válido");
    } else {
      ProtectedRoute2();
    }
  };

  return (
    <Flex height="95vh" d="flex" justify="center" align="center" mt={90}>
      <Flex boxSize="lg" borderRadius="25px" flexDirection="column" p="10px">
        <Flex w="90%" align="center" justify="space-around">
          {isAuthenticatedFuncionario ? (
            <>
              <Box d="flex" w="50%" gap="10px">
                <FaUser size={20} style={{ marginRight: "0px" }} />
                <div>{email_funcionario}</div>
              </Box>
            </>
          ) : isAuthenticatedAdm ? (
            <>
              <Box d="flex" w="50%" gap="10px">
                <FaUser size={20} style={{ marginRight: "0px" }} />
                <div>{email_adm}</div>
              </Box>
            </>
          ) : (
            <Flex
              borderRadius={35}
              bg="red.300"
              p={3}
              align="center"
              justify="center"
            >
              <Flex bg="red" borderRadius={25} p={4}>
                <Icon as={CloseIcon} />
              </Flex>

              <Text p={2} >vc n tem conta mermao</Text>
            </Flex>
          )}
        </Flex>

        <Flex
          mt={70}
          w="100%"
          h="350px"
          borderRadius={25}
          p={5}
          align="center"
          flexDirection="column"
          gap="10px"
          bg={colorMode === "light" ? "#ebf3f7" : "#21226c"}
        >
          <Text fontSize={40} mb={8}>
            Login
          </Text>
          <InputGroup>
            <FormLabel
              htmlFor="email"
              position="absolute"
              fontSize={emailFocused ? "xs" : "sm"}
              color={emailFocused ? "blue.400" : "gray.500"}
              transform={
                emailFocused ||
                  (document.getElementById("email") &&
                    document.getElementById("email").value !== "")
                  ? "translateY(-1rem)"
                  : "translateY(0.25rem) translateX(0.35rem)"
              }
              transition="transform 0.2s, font-size 0.2s, color 0.2s"
            >
              Email
            </FormLabel>
            <Input
              borderRadius={15}
              mb={2}
              placeholder="Email"
              bg={colorMode === "light" ? "white" : "#022b5f"}
              type="text"
              id="email"
              value={isAdmin ? email_adm : email_funcionario}
              onChange={(e) =>
                isAdmin
                  ? setEmailAdm(e.target.value)
                  : setEmailFuncionario(e.target.value)
              }
              disabled={
                isAdmin ? isAuthenticatedAdm : isAuthenticatedFuncionario
              }
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
            />
          </InputGroup>
          <InputGroup size="md">
            <FormLabel
              htmlFor="password"
              position="absolute"
              fontSize={passwordFocused ? "xs" : "sm"}
              color={passwordFocused ? "blue.400" : "gray.500"}
              transform={
                passwordFocused ||
                  (document.getElementById("password") &&
                    document.getElementById("password").value !== "")
                  ? "translateY(-1rem)"
                  : "translateY(0.25rem) translateX(0.35rem)"
              }
              transition="transform 0.2s, font-size 0.2s, color 0.2s"
            >
              Senha
            </FormLabel>
            <Input
              borderRadius={15}
              mt={2}
              placeholder="Senha"
              bg={colorMode === "light" ? "white" : "#022b5f"}
              id="password"
              type={click ? "text" : "password"}
              value={isAdmin ? senha_adm : senha_funcionario}
              onChange={(e) =>
                isAdmin
                  ? setSenhaAdm(e.target.value)
                  : setSenhaFuncionario(e.target.value)
              }
              disabled={
                isAdmin ? isAuthenticatedAdm : isAuthenticatedFuncionario
              }
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
            />
            <InputRightElement width="4.5rem">
              <Button
                mt={4}
                h="1.75rem"
                size="sm"
                onClick={handleClick}
                variant="none"
                _hover={{ opacity: "70%" }}
              >
                {click ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Flex mt={5}>
            <Button onClick={handleLogin} m={2}>Login</Button>
            <Link href="/registre-se">
              <Button m={2}>Registre-se</Button>
            </Link>
            <Link href={isAdmin ? "logado-adm" : "logado-funcionario"}>
              <Button onClick={ProtectedRoute} m={2}>Rota Privada</Button>
            </Link>
          </Flex>

        </Flex>
      </Flex>
    </Flex>
  );
}