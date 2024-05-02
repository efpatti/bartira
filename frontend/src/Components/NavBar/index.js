import { useContext, useState } from "react";
import { NavLink as ReactNavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import {
  Box,
  Button,
  Flex,
  Text,
  Stack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  useColorMode,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import {
  MdCloseFullscreen,
  MdAccountCircle,
  MdDarkMode,
  MdLightMode,
} from "react-icons/md";
import PropTypes from "prop-types";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Usuário deslogado com sucesso");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Flex
      position="fixed"
      top="0"
      p={4}
      align="center"
      w="100%"
      bg={colorMode === "light" ? "teal.400" : "teal.500"}
      zIndex="2"
    >
      <Box display={["none", "none", "flex"]}>
        <Text fontSize="xl" cursor="pointer" as="b">
          <a href="/">Bartira</a>
        </Text>
      </Box>
      <Box flex="1">
        <Stack
          direction={["column", "column", "row"]}
          spacing={["1rem", "1rem", "2rem"]}
          align="center"
          justify="center"
          display={["none", "none", "flex"]}
        >
          <ReactNavLink to={"/"}>Início</ReactNavLink>
          {user && (
            <>
              <ReactNavLink to={"/dashboard"}>Dashboard</ReactNavLink>
              <ReactNavLink to={"/uteis"}>Utilitários</ReactNavLink>
              <ReactNavLink to={"/financeiro"}>Financeiro</ReactNavLink>
              <ReactNavLink to={"/funcionarios"}>Funcionários</ReactNavLink>
              <ReactNavLink to={"/vendas"}>Vendas</ReactNavLink>
            </>
          )}
        </Stack>
      </Box>
      <Box display={["none", "none", "flex"]}>
        <Box position="fixed" bottom="0" left="0" p="3" zIndex="999">
          <IconButton
            as="Button"
            variant="none"
            icon={
              colorMode === "light" ? (
                <MdDarkMode size="25px" />
              ) : (
                <MdLightMode size="25px" />
              )
            }
            onClick={toggleColorMode}
          />
        </Box>
        {user ? (
          <Stack direction="row" spacing="1.5rem" align="center">
            <Text>{user.email}</Text>
            <Button
              onClick={handleLogOut}
              size="sm"
              variant="solid"
              bg={colorMode === "light" ? "gray.700" : "whitesmoke"}
              color={colorMode === "light" ? "teal.200" : "teal.600"}
              _hover={{
                opacity: "90%",
              }}
              border="1px"
              borderColor="transparent"
            >
              Sair
            </Button>
          </Stack>
        ) : (
          <Button>
            <ReactNavLink to="/login">Entrar</ReactNavLink>
          </Button>
        )}
      </Box>
      <Box display={["block", "block", "none"]}>
        <HamburgerMenu />
      </Box>
    </Flex>
  );
};

const HamburgerMenu = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Usuário deslogado com sucesso");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuShown, setIsMenuShown] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsMenuShown(!isMenuShown); // Alternar entre mostrar o menu e o texto "Centro"
    console.log("clicado");
    console.log(isOpen, isMenuShown);
  };

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack direction="row">
      {isMenuShown && (
        <MenuComponent isOpen={isOpen} onClose={() => handleToggle()} />
      )}
      <Box left="3" position="absolute" zIndex="103">
        {isOpen ? (
          <Box zIndex="103">
            <Box position="fixed" bottom="0" left="0" p="3" zIndex="999">
              <IconButton
                as="Button"
                variant="none"
                icon={colorMode === "light" ? <MdDarkMode /> : <MdLightMode />}
                onClick={toggleColorMode}
              />
            </Box>
            <Menu zIndex="103">
              <MenuButton as={Button} zIndex="103" variant="none">
                <MdAccountCircle style={{ zIndex: "103" }} />
              </MenuButton>
              <MenuList zIndex="102" color="black" boxShadow="md">
                {user ? (
                  <MenuGroup title={user.email}>
                    <MenuItem
                      onClick={handleLogOut}
                      as="Button"
                      justify="center"
                      align="center"
                      variant="none"
                    >
                      Sair
                    </MenuItem>
                  </MenuGroup>
                ) : (
                  <MenuGroup>
                    <MenuItem
                      onClick={handleToggle}
                      as="Button"
                      justify="center"
                      align="center"
                      variant="none"
                    >
                      <ReactNavLink to="/login">Entrar</ReactNavLink>
                    </MenuItem>
                  </MenuGroup>
                )}
              </MenuList>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Text fontSize="xl" cursor="pointer" as="b">
              <a href="/">Bartira</a>
            </Text>
          </Box>
        )}
      </Box>

      <Box>
        <IconButton
          variant="none"
          icon={isOpen ? <MdCloseFullscreen /> : <FaBars />}
          aria-label="Abrir menu"
          onClick={handleToggle}
          zIndex="100"
        />
      </Box>
    </Stack>
  );
};

const MenuComponent = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();
  const { user } = useContext(AuthContext);
  return (
    <Box
      position="fixed"
      top="0"
      right="0"
      bg={colorMode === "light" ? "teal.400" : "teal.500"}
      w="100%"
      h="100%"
      zIndex="99"
      display={isOpen ? "block" : "none"}
      border="3px"
    >
      <Stack
        direction="column"
        spacing="1.2rem"
        align="center"
        justify="center"
        bg={colorMode === "light" ? "teal.300" : "teal.700"}
        borderRadius="1rem"
        m={20}
        p={10}
      >
        <ReactNavLink to={"/"} onClick={onClose}>
          Início
        </ReactNavLink>
        {user && (
          <>
            <ReactNavLink to={"/dashboard"} onClick={onClose}>
              Dashboard
            </ReactNavLink>
            <ReactNavLink to={"/uteis"} onClick={onClose}>
              Utilitários
            </ReactNavLink>
            <ReactNavLink to={"/financeiro"} onClick={onClose}>
              Financeiro
            </ReactNavLink>
            <ReactNavLink to={"/funcionarios"} onClick={onClose}>
              Funcionários
            </ReactNavLink>
            <ReactNavLink to={"/vendas"} onClick={onClose}>
              Vendas
            </ReactNavLink>
          </>
        )}
      </Stack>
    </Box>
  );
};

MenuComponent.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Navbar;
