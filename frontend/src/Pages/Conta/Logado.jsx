import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth"; // Alteração aqui
import { Flex, Button, Text, Link } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { useState } from "react";

export function LogadoAdm() {
  const [loggedOff, setLoggedOff] = useState(false);
  const { logout } = useAuth(); // Alteração aqui

  const handleLogout = () => {
    logout();
    toast.warn("Você saiu da conta!");
    setLoggedOff(true);
  };

  if (loggedOff) {
    return <Navigate to="/" />;
  }

  return (
    <Flex h="95vh" justifyContent="center" alignItems="center">
      <Flex
        w="400px"
        h="400px"
        justifyContent="space-around"
        alignItems="center"
        border="3px"
        borderColor="white"
        borderStyle="solid"
        flexDirection="column"
        bg="rgb(123, 54, 244)"
        p="10px"
      >
        <Flex
          w="80%"
          h="320px"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-around"
          textAlign="center"
        >
          <Text fontSize="lg">Adm !!!</Text>
          <Text fontSize="md">Bem vindo a rota privada!</Text>
          <Text fontSize="sm">Você consegue ver isso porque está logado!</Text>
          <Button
            onClick={handleLogout}
            textDecoration="none"
            color="black"
            w="40%"
            bg="white"
            borderRadius="15px"
            textAlign="center"
            p="2"
          >
            <Link to="/">Logout</Link>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export function LogadoFuncionario() {
  const [loggedOff, setLoggedOff] = useState(false);
  const { logout } = useAuth(); // Alteração aqui

  const handleLogout = () => {
    logout();
    toast.warn("Você saiu da conta!");
    setLoggedOff(true);
  };

  const { userType } = useAuth();
  console.log(userType);

  if (loggedOff) {
    return <Navigate to="/" />;
  }
  return (
    <Flex h="95vh" justifyContent="center" alignItems="center">
      <Flex
        w="400px"
        h="400px"
        justifyContent="space-around"
        alignItems="center"
        border="3px"
        borderColor="white"
        borderStyle="solid"
        flexDirection="column"
        bg="rgb(123, 54, 244)"
        p="10px"
      >
        <Flex
          w="80%"
          h="320px"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-around"
          textAlign="center"
        >
          <Text fontSize="lg">Funcionário!!!</Text>
          <Text fontSize="md">Bem vindo a rota privada!</Text>
          <Text fontSize="sm">Você consegue ver isso porque está logado!</Text>
          <Button
            onClick={handleLogout}
            textDecoration="none"
            color="black"
            w="40%"
            bg="white"
            borderRadius="15px"
            textAlign="center"
            p="2"
          >
            <Link to="/">Logout</Link>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
