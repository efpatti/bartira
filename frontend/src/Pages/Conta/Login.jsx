import { useState } from "react";
import axios from "axios";
import {
  Flex,
  Button,
  Box,
  Input,
  InputGroup,
  FormLabel,
  InputRightElement,
  useColorMode,
  Text,
  Stack,
  Link,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth"; // Alteração aqui
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [click, setClick] = useState(false);
  const { login, isAuthenticated, user, logout } = useAuth();

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

  const handleLogin = () => {
    axios
      .post("http://localhost:8081/loginUsuario", {
        email,
        senha,
      })
      .then((res) => {
        const { token } = res.data;
        login(token);
        console.log(token);

        toast.success("Login feito com sucesso!");
        toast.success("Token válido, agora você tem acesso!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <Flex
      height="95vh"
      d="flex"
      justify="center"
      align="center"
      bg={colorMode === "light" ? "gray.200" : "gray.800"}
    >
      <Flex boxSize="lg" borderRadius="25px" flexDirection="column" p="10px">
        <Flex w="90%" align="center" justify="space-around">
          {isAuthenticated ? (
            <Box d="flex" w="50%" gap="10px">
              <FaUser size={20} style={{ marginRight: "0px" }} />
              <div>{user.email}</div>
              <div>{user.nome}</div>
              <Link as={Button} href="/" onClick={logout}>
                Sair
              </Link>
            </Box>
          ) : (
            <Flex
              mt={70}
              w="100%"
              h="350px"
              borderRadius={25}
              p={5}
              align="center"
              flexDirection="column"
              gap="10px"
              bg={colorMode === "light" ? "darkblue" : "blue.700"}
              color={colorMode === "light" ? "white" : "black"}
            >
              <Text fontSize={40} mb={8}>
                Login
              </Text>
              <InputGroup>
                <FormLabel
                  htmlFor="email"
                  position="absolute"
                  fontSize={emailFocused ? "xs" : "sm"}
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
                  color={colorMode === "light" ? "black" : "white"}
                  borderRadius={15}
                  placeholder="Email"
                  bg={colorMode === "light" ? "gray.200" : "gray.800"}
                  type="text"
                  id="email"
                  value={email}
                  mb="3"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isAuthenticated}
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                />
              </InputGroup>
              <InputGroup>
                <FormLabel
                  htmlFor="password"
                  position="absolute"
                  fontSize={passwordFocused ? "xs" : "sm"}
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
                  mb="3"
                  placeholder="Senha"
                  bg={colorMode === "light" ? "gray.200" : "gray.800"}
                  color={colorMode === "light" ? "black" : "white"}
                  id="password"
                  type={click ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  disabled={isAuthenticated}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleClick}
                    variant="none"
                    _hover={{ opacity: "70%" }}
                    color={colorMode === "light" ? "black" : "white"}
                  >
                    {click ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Stack direction="row" gap="3">
                <Link
                  as={Button}
                  href="/logado-adm"
                  onClick={handleLogin}
                  _hover={{ opacity: "80%" }}
                  color={colorMode === "light" ? "gray.800" : "gray.200"}
                  bg={colorMode === "light" ? "gray.200" : "gray.800"}
                >
                  Login
                </Link>
              </Stack>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Login;
