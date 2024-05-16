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

  return (
    <Stack direction="row" top={0} gap="0" position="fixed" w="100%">
      <Box
        p={4}
        bg={colorMode === "light" ? "darkblue" : "blue.700"}
        color="black"
        w="15%"
        zIndex={1000}
      >
        <Sidebar />
      </Box>
      <Box
        bg={colorMode === "light" ? "darkblue" : "blue.700"}
        color="whitesmoke"
        p={4}
        h="20%"
        w="85%"
      >
        <Flex alignItems="center" justify="space-between">
          {/* Barra de Pesquisa */}
          <Box>
            <Input
              w={500}
              borderRadius={500}
              align="center"
              justify="center"
              border={0}
              ml="21%"
              mr="18%"
              color={colorMode === "light" ? "black" : "white"}
              bg={colorMode === "light" ? "white" : "black"}
              placeholder="O que você está buscando?"
            />
          </Box>

          {/* Ícones */}
          <Flex align="center">
            <Stack direction="row" spacing={3}>
              <Menu>
                <MenuButton
                  variant="none"
                  as={IconButton}
                  icon={<MdAccountCircle />}
                  sx={iconsBtn}
                />
                <MenuList
                  paddingBottom="0"
                  m="0"
                  border="0px"
                  color={colorMode === "light" ? "gray.200" : "gray.800"}
                  bg={colorMode === "light" ? "darkblue" : "blue.700"}
                >
                  <MenuGroup title="Perfil">
                    <MenuItem
                      bg={colorMode === "light" ? "white" : "black"}
                      p="2"
                      borderRadius="2px"
                      _hover={{
                        opacity: colorMode === "light" ? "80%" : "90%",
                        bg: colorMode === "light" ? "white" : "gray.800",
                      }}
                      color={colorMode === "light" ? "gray.800" : "gray.200"}
                    >
                      {isAuthenticated ? (
                        <Link
                          href="/"
                          onClick={logout}
                          _hover={{ textDecoration: "none" }}
                          borderColor="none"
                        >
                          Sair
                        </Link>
                      ) : (
                        <Link
                          href="/"
                          _hover={{ textDecoration: "none" }}
                          borderColor="none"
                        >
                          Login
                        </Link>
                      )}
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
              <IconButton
                variant="none"
                sx={iconsBtn}
                arial-label="Pesquisar"
                icon={<MdSearch />}
              />
              <IconButton
                variant="none"
                sx={iconsBtn}
                aria-label="Abrir Menu"
                size="lg"
                mr={2}
                icon={<MdMenu />}
                display={["flex", "flex", "none", "none"]}
                onClick={() => changeDisplay("flex")}
              />

              <IconButton
                variant="none"
                sx={iconsBtn}
                aria-label="Alternar modo de cor"
                icon={colorMode === "light" ? <MdDarkMode /> : <MdLightMode />}
                onClick={toggleColorMode}
              />
            </Stack>
          </Flex>
        </Flex>

        {/* Menu lateral */}
        <Flex
          height={{
            base: "100%",
            md: "0%",
          }}
          ml="40%"
          w={250}
          h="100%"
          zIndex={20}
          pos="fixed"
          top={0}
          left={0}
          overflow="auto"
          flexDir="column"
          display={display}
        >
          <Flex justify="flex-end">
            <IconButton
              variant="none"
              sx={iconsBtn}
              m={8}
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
                color={colorMode === "light" ? "white" : "white"}
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
                  color={colorMode === "light" ? "white" : "white"}
                  _hover={{
                    color: colorMode === "light" ? "blue" : "blue",
                  }}
                >
                  Conta
                </MenuButton>
                <MenuList paddingBottom="0" m="1">
                  <MenuGroup title="Perfil">
                    <MenuItem>
                      <Link href="/login" _hover={{ textDecoration: "none" }}>
                        Login
                      </Link>
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
              <IconButton aria-label="Pesquisar" icon={<MdAccountCircle />} />
            </Flex>

            <Flex align="center">
              <Text
                _hover={{
                  color: colorMode === "light" ? "blue" : "blue",
                }}
                color={colorMode === "light" ? "white" : "white"}
              >
                Pesquisar
              </Text>
              <IconButton aria-label="Pesquisar" icon={<MdSearch />} />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Stack>
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