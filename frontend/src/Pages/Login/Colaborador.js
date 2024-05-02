import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  CardHeader,
  Text,
  Input,
  Flex,
  CardBody,
  Stack,
  Card,
  Button,
  Link,
  useColorMode,
} from "@chakra-ui/react";

const Colaborador = () => {
  const { colorMode } = useColorMode();

  useEffect(() => {
    document.title = "Centro | Entrar";
  }, []);
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleEmailFocus = () => setEmailFocused(true);
  const handleEmailBlur = (e) => {
    if (!e.target.value) setEmailFocused(false);
  };
  const handlePasswordFocus = () => setPasswordFocused(true);
  const handlePasswordBlur = (e) => {
    if (!e.target.value) setPasswordFocused(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        e.target.reset();
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Flex align="center" justify="center" h="100%">
      <Card w="80%">
        <CardHeader textAlign="center">
          <Text fontSize="xl" fontWeight="bold">
            Colaborador
          </Text>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleLogin}>
            <Stack direction="column" spacing="1rem">
              <FormControl isRequired>
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
                  type="email"
                  id="email"
                  name="email"
                  required
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                />
              </FormControl>
              <FormControl isRequired>
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
                  type="password"
                  id="password"
                  name="password"
                  required
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                />
              </FormControl>
              <Button
                type="submit"
                variant="solid"
                bg={colorMode === "light" ? "teal.400" : "teal.500"}
                width="full"
                _hover={{ opacity: "90%" }}
                mt={6}
              >
                Entrar
              </Button>
              <Link as="em">Esqueceu sua senha?</Link>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Colaborador;
