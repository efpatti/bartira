import React, { useState } from "react";
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
  MdSell,
} from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import { FaFileContract, FaSearch, FaUsers } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { IoIosBusiness } from "react-icons/io";

const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const {
    isAuthenticated,
    userType,
    logout,
    user,
    setSideBarClicada,
    sideBarClicada,
  } = useAuth();
  const [display, changeDisplay] = useState(false); // Changed to a boolean value for toggle
  const [buttonIcon, setButtonIcon] = useState(<MdMenu />); // State to manage button icon

  const toggleSidebar = () => {
    changeDisplay(!display); // Toggle the state
    setButtonIcon(display ? <MdMenu /> : <MdCloseFullscreen />); // Change button icon based on display state
    setSideBarClicada(!sideBarClicada);
  };

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
    >
      <Flex
        alignItems="center"
        justify="space-between"
        bg={colorMode === "light" ? "darkblue" : "blue.700"}
      >
        <a href="/">
          <Image
            src="https://www.moveisbartira.com.br/images/logos/bartira-branco-vermelho.svg?256&q=75"
            boxSize={20}
          />
        </a>
        <Box bg={colorMode === "light" ? "darkblue" : "blue.700"}>
          <Input
            w={[150, 400, 500]}
            borderRadius={500}
            align="center"
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
            aria-label="Alternar Menu"
            size="lg"
            mr={2}
            icon={buttonIcon} // Use the button icon state
            display={["flex"]}
            onClick={toggleSidebar} // Toggle sidebar on button click
          />
        </Flex>
      </Flex>

      {/* Menu lateral */}
      <Flex
        right={0} // Position sidebar to the right
        bg={colorMode === "light" ? "darkblue" : "blue.700"}
        w={250}
        pr={8}
        h="100%"
        pos="fixed"
        top={0}
        overflow="auto"
        flexDir="column"
        display={display ? "flex" : "none"} // Show or hide sidebar based on display state
      >
        <Flex justify="flex-end">
          <IconButton
            sx={iconsBtn}
            mb={8}
            mt={6}
            aria-label="Fechar Menu"
            size="lg"
            icon={<MdCloseFullscreen />}
            onClick={toggleSidebar} // Toggle sidebar on button click
          />
        </Flex>

        {/* Sidebar content */}
        <Flex
          flexDir="column"
          align="flex-end"
          justify="flex-end"
          opacity="100%"
        >
          {isAuthenticated &&
            (userType === "Administrador" || userType === "Funcionário" ? (
              <>
                <Flex align="center">
                  <Button sx={iconBtn} as={Link} href="/usuarios">
                    <Text>Usuários</Text>
                    <Box ml="3">
                      <FaUsers />
                    </Box>
                  </Button>
                </Flex>
                {userType === "Administrador" && (
                  <Flex align="center">
                    <Button sx={iconBtn} as={Link} href="/financeiro">
                      <Text>Financeiro</Text>
                      <Box ml="3">
                        <IoIosBusiness />
                      </Box>
                    </Button>
                  </Flex>
                )}
                <Flex align="center">
                  <Button sx={iconBtn} as={Link} href="/produtos">
                    <Text>Produtos</Text>
                    <Box ml="3">
                      <FaBagShopping />
                    </Box>
                  </Button>
                </Flex>
                <Flex align="center">
                  <Button sx={iconBtn} as={Link} href="/vendas">
                    <Text>Vendas</Text>
                    <Box ml="3">
                      <MdSell />
                    </Box>
                  </Button>
                </Flex>
                <Flex align="center">
                  <Button sx={iconBtn} as={Link} href="/fornecedores">
                    <Text>Fornecedores</Text>
                    <Box
                      ml="3"
                      color={colorMode === "light" ? "white" : "black"}
                    >
                      <IoIosBusiness />
                    </Box>
                  </Button>
                </Flex>
              </>
            ) : (
              <>
                <Flex align="center">
                  <Button sx={iconBtn} as={Link} href="/orcamento">
                    <Text>Orçamento</Text>
                    <Box ml="3">
                      <FaFileContract />
                    </Box>
                  </Button>
                </Flex>
              </>
            ))}

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
                  <MenuGroup
                    title={user.nome}
                    color={colorMode === "light" ? "gray.800" : "gray.200"}
                  >
                    <MenuItem>
                      <Button
                        onClick={logout}
                        variant="none"
                        color={colorMode === "light" ? "gray.800" : "gray.200"}
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
          {isAuthenticated && (
            <Flex align="center">
              <Button sx={iconBtn} as={Link} href="/perfil">
                <Text>Configurações</Text>
                <Box ml="3">
                  <MdSettings />
                </Box>
              </Button>
            </Flex>
          )}
          <Flex align="center">
            <Button sx={iconBtn}>
              <Text>Pesquisar</Text>
              <Box ml="3">
                <FaSearch />
              </Box>
            </Button>
          </Flex>

          <IconButton
            position="absolute"
            variant="none"
            sx={iconsBtn}
            bottom="0"
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
