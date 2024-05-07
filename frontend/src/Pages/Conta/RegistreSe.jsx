import { useState } from "react";
import axios from "axios";
import { Box, Flex, Input, Button, Link, Text } from "@chakra-ui/react";
import { toast } from "react-toastify";

export function RegistreSe() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    axios
      .post("http://localhost:8080/registre-se", { username, password })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <Box w="100%" height="95vh" d="flex" justify="center" align="center">
      <Flex
        w="400px"
        h="400px"
        justify="space-around"
        align="center"
        border="3px"
        borderColor="white"
        borderStyle="solid"
        borderRadius="25px"
        flexDirection="column"
        p="10px"
      >
        <Text fontSize="lg" as="b">
          Registre-se
        </Text>
        <Flex
          boxSize="md"
          align="center"
          flexDirection="column"
          justify="center"
          borderRadius="2rem"
          border="2px"
          borderColor="black"
          borderStyle="solid"
          gap="10px"
          p="7"
        >
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link href="/">
            <Button onClick={handleRegister}>Registrar</Button>
          </Link>
          <Link href="/">
            <Button>Voltar</Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
