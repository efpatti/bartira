import {
  Stack,
  Button,
  Box,
  Grid,
  Text,
  Flex,
  useColorMode,
  IconButton,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

function Profile() {
  useEffect(() => {
    optionClick();
  }, []);

  const [option, setOption] = useState(false);
  const { colorMode } = useColorMode();
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const optionClick = () => {
    setOption(true);
  };

  const optionClicked = {
    fontSize: "sm",
    fontWeight: "normal",
    bg: colorMode === "light" ? "darkblue" : "blue.700",
    color: colorMode === "light" ? "white" : "black",
    borderRadius: "15px",
    p: "5",
    _hover: {
      bg: colorMode === "light" ? "blue.700" : "blue.900",
    },
  };

  return (
    <Flex direction={{ base: "column", md: "row" }} w="100%">
      <Box width={{ lg: "15%" }} mt="5rem" mb={-10}>
        <Stack
          direction="column"
          gap="2"
          bg={"gray.300"} 
          h="95%"
          w="155%"
        >
          <Text fontSize="xl" mb={5} mt="25%" ml={8} color="gray.900">Bem vindo (a),</Text>
          <Avatar size="lg" ml={99} name={user.nome} src={user.avatarUrl} mb="6" />
          <Text fontSize="xl" ml="25%" fontWeight="bold">{user.nome}</Text>
          <Text fontSize="md" ml="15%" color="gray.700">{user.email}</Text>
        </Stack>
      </Box>
      <Flex
        minH="50vh"
        textAlign="center"
        py="7rem"
        justifyContent="center"
        width={{ base: "100%", md: "80%" }}
        height="100%"
        color="gray.800"
        alignItems="center"
      >
        {option && <ProfileOption />}
      </Flex>
    </Flex>

  );
}

function ProfileOption() {
  const itemProfile = {
    border: "1px",
    borderColor: "gray.300",
    borderRadius: "15px",
    p: "5",
    m: "3",
  };
  const labelInfo = {
    fontWeight: "bold",
  };
  const { user } = useAuth();
  const { colorMode } = useColorMode();

  return (
    <Flex justify="center" align="center" w="100%" minH="100vh" color={colorMode === "light" ? "black" : "white"}>
      <Stack direction="column" gap="2" w={{ base: "90%", md: "50%" }}>
      <Heading as="h3" mt={5}>Meu perfil</Heading>
        <Box sx={itemProfile}>
          <Flex
            direction="column"
            align="center"
            justify="center"
            mb="5"
          >
          </Flex>
          <Flex
            borderBottom="1px"
            w="100%"
            borderColor="gray.300"
            align="center"
            justifyContent="space-between"
            p="2"
          >
            <Text>Informações Pessoais</Text>
            <IconButton
              bg="0"
              borderRadius="xl"
              border="1px"
              borderColor="gray.300"
              variant="none"
              icon={<FaEdit />}
              color={colorMode === "light" ? "black" : "white"}
            />
          </Flex>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap="2" p="2" m="3">
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>Nome</Text>
                <Text>{user.nome}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>Email</Text>
                <Text>{user.email}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>Cargo</Text>
                <Text>{user.cargo}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>Posição</Text>
                <Text>{user.cargo}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>CPF</Text>
                <Text>{user.cpf}</Text>
              </Stack>
            </Box>
          </Grid>
        </Box>
        <Box sx={itemProfile}>
          <Flex
            borderBottom="1px"
            w="100%"
            borderColor="gray.300"
            align="center"
            justifyContent="space-between"
            p="2"
          >
            <Text>Endereço</Text>
            <IconButton
              bg="0"
              borderRadius="xl"
              border="1px"
              borderColor="gray.300"
              variant="none"
              icon={<FaEdit />}
              color={colorMode === "light" ? "black" : "white"}
            />
          </Flex>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap="2" p="2" m="3">
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>Rua</Text>
                <Text>{user.rua}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>Número</Text>
                <Text>{user.numero}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>Cidade</Text>
                <Text>{user.cidade}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>Estado</Text>
                <Text>{user.estado}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>País</Text>
                <Text>{user.pais}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>CEP</Text>
                <Text>{user.cep}</Text>
              </Stack>
            </Box>
          </Grid>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Profile;
