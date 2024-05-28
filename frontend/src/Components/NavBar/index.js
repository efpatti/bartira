import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  IconButton,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  Link,
  Text,
  Stack,
  VStack,
  Button,
  Image,
} from "@chakra-ui/react";
import {
  MdAccountCircle,
  MdSearch,
  MdDarkMode,
  MdLightMode,
  MdCloseFullscreen,
  MdSettings,
  MdMenu,
} from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../../img/bartira.png";

const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isAuthenticated, userType, logout } = useAuth();
  const [display, changeDisplay] = useState("none");
  useEffect(() => {
    // Este useEffect vai ser chamado sempre que isAuthenticated, userType ou display mudarem
    // Você pode adicionar qualquer lógica que precisa ser executada quando esses valores mudarem
    // Por exemplo, atualizar o estado localmente ou fazer chamadas de API
  }, [isAuthenticated, userType, display]); // Adicionando o display como uma dependência
  const iconsBtn = {
    _hover: {
      opacity: "50%",
    },
    color: colorMode === "light" ? "whitesmoke" : "black",
    bg: "none",
  };

  const accountsBtn = {
    _hover: {
      bg: colorMode === "light" ? "gray.300" : "gray.700",
      textDecoration: "none",
    },
    color: colorMode === "light" ? "gray.800" : "gray.200",
    bg: colorMode === "light" ? "gray.200" : "gray.800",
  };

  return (
    <Box
      zIndex={10}
      bg={colorMode === "light" ? "darkblue" : "blue.700"}
      position="fixed"
      top="0"
      color="whitesmoke"
      p={4}
      w="100%"
      mb={3}
    >
      <Flex
        alignItems="center"
        justify="space-between"
        bg={colorMode === "light" ? "darkblue" : "blue.700"}
      >
        {/* Barra de Pesquisa */}
        <a href="/login">
          <Image
            src="https://www.moveisbartira.com.br/images/logos/bartira-branco-vermelho.svg?256&q=75"
            fluid
            boxSize={20}
          /></a>
        <Box bg={colorMode === "light" ? "darkblue" : "blue.700"}>
          <Input
            w={[150, 400, 500]}
            borderRadius={500}
            align="center"
            fluid
            justify="center"
            border={0}
            color={colorMode === "light" ? "black" : "white"}
            bg={colorMode === "light" ? "white" : "black"}
            placeholder="O que você está buscando?"
          />
        </Box>

        {/* Ícones */}
        <Flex
          align="center"
          mr={15}
          bg={colorMode === "light" ? "darkblue" : "blue.700"}
        >

          <IconButton
            variant="none"
            sx={iconsBtn}
            aria-label="Abrir Menu"
            size="lg"
            mr={2}
            icon={<MdMenu />}
            display={["flex"]}
            onClick={() => changeDisplay("flex")}
          />
        </Flex>
      </Flex>

      {/* Menu lateral */}
      <Flex
        ml={["40%", "50%", "81%"]}
        bg={colorMode === "light" ? "darkblue" : "blue.700"}
        w={250}
        pr={8}
        h="100%"
        pos="fixed"
        placement='right'
        top={0}
        left={0}
        overflow="auto"
        flexDir="column"
        display={display}
      >
        <Flex justify="flex-end">
          <IconButton
            sx={iconsBtn}
            mb={8}
            mt={6}
            aria-label="Fechar Menu"
            size="lg"
            icon={<MdCloseFullscreen />}
            onClick={() => changeDisplay("none")}
          />
        </Flex>

        <Flex flexDir="column" align="flex-end" justify="flex-end" mt={3}>
          <Flex align="center">
            <Text
              _hover={{
                color: colorMode === "light" ? "blue" : "blue",
              }}
              color={colorMode === "light" ? "white" : "black"}
            >
              Configurações
            </Text>
            <IconButton
              variant="none"
              sx={iconsBtn}
              arial-label="Login"
              icon={<MdSettings />}
              color={colorMode === "light" ? "white" : "white"}
              _hover={{
                color: colorMode === "light" ? "blue" : "blue",
              }}
            />
          </Flex>
          <Flex align="center">
            <Menu>
              <MenuButton
                arial-label="Login"
                icon={<MdSettings />}
                color={colorMode === "light" ? "white" : "black"}
                _hover={{
                  color: colorMode === "light" ? "blue" : "blue",
                }}
              >
                Conta
              </MenuButton>
              <MenuList paddingBottom="0" m="1">
                <MenuGroup title="Perfil"
                  color={colorMode === "light" ? "blue.700" : "white"}>
                  <MenuItem>
                    <Link href="/login" color={colorMode === "light" ? "blue.700" : "white"} _hover={{ textDecoration: "none" }}>
                      Login
                    </Link>
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
            <IconButton aria-label="Pesquisar" bg={'none'} color={colorMode === "light" ? "white" : "black"} z icon={<MdAccountCircle />} />
          </Flex>

          <Flex align="center">
            <Text
              _hover={{
                color: colorMode === "light" ? "blue" : "blue",
              }}
              color={colorMode === "light" ? "white" : "black"}
            >
              Pesquisar
            </Text>
            <IconButton bg={'none'} color={colorMode === "light" ? "white" : "black"} aria-label="Pesquisar" icon={<MdSearch />} />
          </Flex>

          <IconButton
            variant="none"
            sx={iconsBtn}
            mt={["250%", "130%"]}
            aria-label="Alternar modo de cor"
            icon={colorMode === "light" ? <MdDarkMode /> : <MdLightMode />}
            onClick={toggleColorMode}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

const Sidebar = () => {
  const { isAuthenticated, userType } = useAuth();

  useEffect(() => {
    // Este useEffect vai ser chamado sempre que isAuthenticated, userType ou display mudarem
    // Você pode adicionar qualquer lógica que precisa ser executada quando esses valores mudarem
    // Por exemplo, atualizar o estado localmente ou fazer chamadas de API
  }, [isAuthenticated, userType]); // Adicionando o display como uma dependência

  return (
    <VStack h="100vh" w="100%">
      {" "}
      {/* Alteração feita aqui */}
      <Box mb="3">
        <img
          src="https://www.moveisbartira.com.br/images/logos/bartira-branco-vermelho.svg?256&q=75"
          alt="bartira"
          width="150"
          justify="flex-end"
        />
      </Box>
      <Stack justify="center" align="center" gap="3">
        {isAuthenticated ? (
          <>
            <Link href="/produtos">Produtos</Link>{" "}
            {userType === "Administrador" ? (
              <>
                <Link href="/usuarios">Usuários</Link>
                <Link href="/financeiro">Financeiro</Link>
                <Link href="/logado-adm">Login</Link>
              </>
            ) : (
              <Link href="/logado-funcionario">Login</Link>
            )}
          </>
        ) : (
          <Link href="/">Login</Link>
        )}
      </Stack>
    </VStack>
  );
};

export default NavBar;