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
  Button,
  Image,
} from "@chakra-ui/react";
import {
  MdAccountCircle,
  MdDarkMode,
  MdLightMode,
  MdCloseFullscreen,
  MdSettings,
  MdMenu,
} from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import { FaFileContract, FaSearch, FaUsers } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";

const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isAuthenticated, userType, logout, user } = useAuth();
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

  const iconBtn = {
    background: "none",
    _hover: {
      color: "blue",
      background: "none",
      transition: "all 200ms",
      textDecoration: "none",
    },
    transition: "all 200ms",
    color: colorMode === "light" ? "white" : "black",
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
        <a href="/">
          <Image
            src="https://www.moveisbartira.com.br/images/logos/bartira-branco-vermelho.svg?256&q=75"
            fluid
            boxSize={20}
          />
        </a>
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
        placement="right"
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

        <Flex flexDir="column" align="flex-end" justify="flex-end">
          {isAuthenticated &&
            (userType === "Administrador" || "Funcionário" ? (
              <>
                <Flex align="center">
                  <Button sx={iconBtn} as={Link} href="/perfil">
                    <Text>Usuários</Text>
                    <Box ml="3">
                      <FaUsers />
                    </Box>
                  </Button>
                </Flex>
                <Flex align="center">
                  <Button sx={iconBtn} as={Link} href="/perfil">
                    <Text>Produtos</Text>
                    <Box ml="3">
                      <FaBagShopping />
                    </Box>
                  </Button>
                </Flex>
              </>
            ) : (
              <>
                <Flex align="center">
                  <Button sx={iconBtn} as={Link} href="/perfil">
                    <Text>Orçamento</Text>
                    <Box ml="3">
                      <FaFileContract />
                    </Box>
                  </Button>
                </Flex>
              </>
            ))}

          <Flex align="center">
            <Button sx={iconBtn} as={Link} href="/perfil">
              <Text>Configurações</Text>
              <Box ml="3">
                <MdSettings />
              </Box>
            </Button>
          </Flex>
          <Flex align="center">
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={
                  <Box ml="2">
                    <MdAccountCircle />
                  </Box>
                }
                sx={iconBtn}
                variant="none"
              >
                Conta
              </MenuButton>
              <MenuList paddingBottom="0" m="1">
                {isAuthenticated ? (
                  <MenuGroup title={user.nome}>
                    <MenuItem>
                      <Button
                        onClick={logout}
                        variant="none"
                        color={colorMode === "light" ? "black" : "white"}
                      >
                        Sair
                      </Button>
                    </MenuItem>
                  </MenuGroup>
                ) : (
                  <MenuItem>
                    <Button
                      as={Link}
                      _hover={{ textDecoration: "none" }}
                      variant="none"
                      href="/"
                      color={colorMode === "light" ? "black" : "white"}
                    >
                      Login
                    </Button>
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </Flex>

          <Flex align="center">
            <Button sx={iconBtn}>
              <Text>Pesquisar</Text>
              <Box ml="3">
                <FaSearch />
              </Box>
            </Button>
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

export default NavBar;
