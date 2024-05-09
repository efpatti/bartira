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
} from "@chakra-ui/react";
import { SearchIcon, MoonIcon, SunIcon, SettingsIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [display, changeDisplay] = useState('none')

  return (
    <Box bg={"darkblue"} p={4}>
      <Flex alignItems="center">
        {/* Logo */}
        <Box>
          <img
            src="https://www.moveisbartira.com.br/images/logos/bartira-branco-vermelho.svg?256&q=75"
            alt="bartira"
            width="150"
            justify="flex-end"
          />
        </Box>

        {/* Barra de Pesquisa */}
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

        {/* Ícones */}

        <Flex justify="flex-end" >

          <Flex display={['none', 'none', 'flex', 'flex']}>

            <IconButton
              arial-label="Login"
              icon={<SettingsIcon />}
              color={colorMode === "light" ? "white" : "white"}
              bg={0}
              _hover={{
                color: colorMode === "light" ? "blue" : "blue",
              }}
            />

            <Menu>
              <MenuButton>
                <IconButton
                  arial-label="Login"
                  icon={<SettingsIcon />}
                  color={colorMode === "light" ? "white" : "white"}
                  bg={0}
                  _hover={{
                    color: colorMode === "light" ? "blue" : "blue",
                  }}
                />
              </MenuButton>
              <MenuList paddingBottom="0" m="1" >
                <MenuGroup title="Perfil">
                  <MenuItem>
                    <Link href="/login" _hover={{ textDecoration: "none" }} >
                      Login
                    </Link>
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
            <IconButton
              aria-label="Pesquisar"
              icon={<SearchIcon />}
              color={colorMode === "light" ? "white" : "white"}
              bg={0}
              _hover={{
                color: colorMode === "light" ? "blue" : "blue",
              }}
            />
          </Flex>

          <IconButton
            aria-label="Abrir Menu"
            size="lg"
            mr={2}
            icon={<HamburgerIcon />}
            display={['flex', 'flex', 'none', 'none']}
            onClick={() => changeDisplay('flex')}
          />

          <IconButton
            ml={4}
            aria-label="Alternar modo de cor"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            color={colorMode === "light" ? "white" : "white"}
            bg={0}
            _hover={{
              color: colorMode === "light" ? "blue" : "blue",
            }}
          />
        </Flex>
      </Flex>

      {/* Menu Responsivo */}

      <Flex
        ml="40%"
        w={250}
        h="100%"
        bgColor="darkblue"
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
            m={10}
            aria-label="Fechar Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => changeDisplay('none')}
          />
        </Flex>

        <Flex
          m={10}
          flexDir="column"
          align="flex-end"
          justify="flex-end"
        >
          <IconButton
            arial-label="Login"
            icon={<SettingsIcon />}
            color={colorMode === "light" ? "white" : "white"}
            bg={0}
            _hover={{
              color: colorMode === "light" ? "blue" : "blue",
            }}
          />
          <Text
          color={colorMode === "light" ? "white" : "white"}
          >Configurações</Text>

          <Menu>
            <MenuButton>
              <IconButton
                arial-label="Login"
                icon={<SettingsIcon />}
                color={colorMode === "light" ? "white" : "white"}
                bg={0}
                _hover={{
                  color: colorMode === "light" ? "blue" : "blue",
                }}
              />
            </MenuButton>
            <MenuList paddingBottom="0" m="1" >
              <MenuGroup title="Perfil">
                <MenuItem>
                  <Link href="/login" _hover={{ textDecoration: "none" }} >
                    Login
                  </Link>
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
          <Text
          color={colorMode === "light" ? "white" : "white"}
          >Login</Text>

          <IconButton
            aria-label="Pesquisar"
            icon={<SearchIcon />}
            color={colorMode === "light" ? "white" : "white"}
            bg={0}
            _hover={{
              color: colorMode === "light" ? "blue" : "blue",
            }}
          />
          <Text
          color={colorMode === "light" ? "white" : "white"}
          >Pesquisar</Text>

        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
