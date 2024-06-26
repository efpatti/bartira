import { Stack, Text, useColorMode } from "@chakra-ui/react";

const Footer = () => {
  const { colorMode } = useColorMode();
  return (
    <Stack
      position="absolute"
      p={8}
      bgColor={colorMode === "light" ? "darkblue" : "blue.700"}
      alignItems="center"
      color={colorMode === "light" ? "gray.200" : "gray.800"}
      width="100%"
      zIndex="1000"
    >
      <Stack
        d={{ base: "flex", md: "none" }}
        alignItems="center"
        color={colorMode === "light" ? "white" : "white"}
      >
        <p>
          © {new Date().getFullYear()} INDÚSTRIA DE MÓVEIS BARTIRA LTDA. Todos
          os direitos reservados.
        </p>
      </Stack>
    </Stack>
  );
};

export default Footer;
