import { useState } from "react";
import axios from "axios";
import { Box, Flex, Input, Button, Link } from "@chakra-ui/react";
import { toast } from "react-toastify";

export function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    axios
      .post("http://localhost:8080/register", { username, password })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
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
        <h1>Registre-se</h1>
        <Box
          w="85%"
          h="320px"
          d="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          border="2px"
          borderColor="black"
          borderStyle="solid"
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
          <Button
            onClick={handleRegister}
            bg="white"
            color="black"
            borderRadius="15px"
            textAlign="center"
            p="2"
            textDecoration="none"
            w="40%"
          >
            <Link to="/">Registrar</Link>
          </Button>
          <Button
            bg="white"
            color="black"
            borderRadius="15px"
            textAlign="center"
            p="2"
            textDecoration="none"
            w="40%"
          >
            <Link to="/">Voltar</Link>
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
