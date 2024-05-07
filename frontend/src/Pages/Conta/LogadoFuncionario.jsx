import { toast } from "react-toastify";
import { useAuthFuncionario } from "../../hooks/useAuthFuncionario";
import { Flex, Button, Text, Link } from "@chakra-ui/react";

export function LogadoFuncionario() {
  const { logout } = useAuthFuncionario();

  const handleLogout = () => {
    logout();
    toast.warn("Você saiu da conta!");
  };

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
        bg="blue"
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
          <Text fontSize="lg">Funcionário</Text>
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
