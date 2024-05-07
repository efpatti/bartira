import { useState } from "react";
import { NavLink as ReactNavLink } from "react-router-dom";
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
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { MdCloseFullscreen, MdAccountCircle } from "react-icons/md";
import PropTypes from "prop-types";

const Navbar = () => {
  return (
    <Flex
      position="fixed"
      top="0"
      p={4}
      align="center"
      w="100%"
      bg="teal.400"
      zIndex="2"
    >
      <Box display={["none", "none", "flex"]}>
        <Text fontSize="xl" cursor="pointer" as="b">
          <a href="/">Exemplo</a>
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
          <>
            <ReactNavLink to={"/signup"}>Cadastrar</ReactNavLink>
            <ReactNavLink to={"/dashboard"}>Dashboard</ReactNavLink>
          </>
        </Stack>
      </Box>
      <Box display={["none", "none", "flex"]}>
        <Stack direction="row" spacing="1.5rem" align="center"></Stack>
        <Button>
          <ReactNavLink to="/signin">Entrar</ReactNavLink>
        </Button>
      </Box>
      <Box display={["block", "block", "none"]}>
        <HamburgerMenu />
      </Box>
    </Flex>
  );
};

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuShown, setIsMenuShown] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsMenuShown(!isMenuShown); // Alternar entre mostrar o menu e o texto "Centro"
    console.log("clicado");
    console.log(isOpen, isMenuShown);
  };

  return (
    <Stack direction="row">
      {isMenuShown && (
        <MenuComponent isOpen={isOpen} onClose={() => handleToggle()} />
      )}
      <Box left="3" position="absolute" zIndex="103">
        {isOpen ? (
          <Box zIndex="103">
            <Menu zIndex="103">
              <MenuButton as={Button} zIndex="103" variant="none">
                <MdAccountCircle style={{ zIndex: "103" }} />
              </MenuButton>
              <MenuList zIndex="102" color="black" boxShadow="md">
                <MenuGroup>
                  <MenuItem
                    onClick={handleToggle}
                    as="Button"
                    justify="center"
                    align="center"
                    variant="none"
                  >
                    <ReactNavLink to="/signin">Entrar</ReactNavLink>
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Text fontSize="xl" cursor="pointer" as="b">
              <a href="/">Exemplo</a>
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
  return (
    <Box
      position="fixed"
      top="0"
      right="0"
      bg="teal.400"
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
        bg="teal.300"
        borderRadius="1rem"
        m={20}
        p={10}
      >
        <ReactNavLink to={"/"} onClick={onClose}>
          Início
        </ReactNavLink>
        <>
          <ReactNavLink to={"/signup"} onClick={onClose}>
            Cadastrar
          </ReactNavLink>
          <ReactNavLink to={"/dashboard"} onClick={onClose}>
            Dashboard
          </ReactNavLink>
        </>
      </Stack>
    </Box>
  );
};

MenuComponent.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Navbar;