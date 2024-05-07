import { Box, Flex, Input, IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { SearchIcon, MoonIcon, SunIcon, SettingsIcon } from "@chakra-ui/icons";

const NavBar = () => {
  const { toggleColorMode } = useColorMode();
  const iconColor = useColorModeValue("white", "blue");

  return (
    <Box bg={"darkblue"} p={4}>
      <Flex alignItems="center">
        {/* Logo */}
        <Box>
          <img src="https://www.moveisbartira.com.br/images/logos/bartira-branco-vermelho.svg?256&q=75" alt="bartira" width="150" ml={50} />
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
          <IconButton
            arial-label="Login"
            icon={<SettingsIcon />}
            color={iconColor}
            bg={0}
          />
          <IconButton
            aria-label="Pesquisar"
            icon={<SearchIcon />}
            color={iconColor}
            bg={0}
          />
          <IconButton
            ml={4}
            aria-label="Alternar modo de cor"
            icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
            onClick={toggleColorMode}
            color={iconColor}
            bg={0}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;


