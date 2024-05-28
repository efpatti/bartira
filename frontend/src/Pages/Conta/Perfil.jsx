import {
  Stack,
  Button,
  Box,
  Grid,
  Text,
  Flex,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

function Profile() {
  useEffect(() => {
    optionClick(1);
  });
  const [option, setOption] = useState(false);
  const { colorMode } = useColorMode();
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const optionClick = () => {
    setOption(true);
  };

  const optionClicked = {
    fontSize: "sm",
    fontWeight: "normal",
    bg: colorMode === "light" ? "blue.600" : "darkblue",
    color: colorMode === "light" ? "white" : "black",
    borderRadius: "15px",
    p: "5",
    _hover: {
      bg: "",
    },
  };

  return (
    <Flex w="100%">
      <Box width="15%" mt="5rem">
        <Stack
          direction="column"
          gap="2"
          justify="center"
          align="center"
          mt="10"
        >
          <Button onClick={() => optionClick()} sx={optionClicked}>
            Meu Perfil
          </Button>
        </Stack>
      </Box>
      <Flex
        minH="50vh"
        textAlign="center"
        paddingY="7rem"
        display="flex"
        justifyContent="center"
        width="80%"
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
  return (
    <Flex justify="center" align="center" w="100%" minH="100vh">
      <Stack direction="column" gap="2" w="50%">
        <Box sx={itemProfile}>
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
              right="0"
              icon={<FaEdit />}
            />
          </Flex>
          <Grid templateColumns="repeat(2, 1fr)" gap="2" p="2" m="3">
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
              right="0"
              icon={<FaEdit />}
            />
          </Flex>
          <Grid templateColumns="repeat(2, 1fr)" gap="2" p="2" m="3">
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
