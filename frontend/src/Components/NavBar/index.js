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
} from "@chakra-ui/react";
import { SearchIcon, MoonIcon, SunIcon, SettingsIcon } from "@chakra-ui/icons";

const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box bg={"darkblue"} p={4}>
      <Flex alignItems="center">
        {/* Logo */}
        <Box>
          <img
            src="https://www.moveisbartira.com.br/images/logos/bartira-branco-vermelho.svg?256&q=75"
            alt="bartira"
            width="150"
            ml={50}
          />
        </Box>

        {/* Barra de Pesquisa */}
        <Input
          w={500}
          align="center"
          ml="21%"
          justify="center"
          variant="filled"
          placeholder="O que você está buscando?"
        />

        {/* Ícones */}
        <Flex ml="20%">
          <Menu>
            <MenuButton>
              <IconButton
                arial-label="Login"
                icon={<SettingsIcon />}
                color={colorMode === "light" ? "white" : "black"}
                bg={0}
                _hover={{
                  color: colorMode === "light" ? "gray.600" : "gray.300",
                }}
              />
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
          <IconButton
            aria-label="Pesquisar"
            icon={<SearchIcon />}
            color={colorMode === "light" ? "white" : "black"}
            bg={0}
            _hover={{
              color: colorMode === "light" ? "gray.600" : "gray.300",
            }}
          />
          <IconButton
            ml={4}
            aria-label="Alternar modo de cor"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            color={colorMode === "light" ? "white" : "black"}
            bg={0}
            _hover={{
              color: colorMode === "light" ? "gray.600" : "gray.300",
            }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
