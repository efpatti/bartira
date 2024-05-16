import { Stack, Text, useColorMode } from "@chakra-ui/react";

const Footer = () => {
  const { colorMode } = useColorMode();
  return (
    <Stack
      marginInline="auto"
      p={8}
      bgColor={colorMode === "light" ? "darkblue" : "blue.700"}
      alignItems="center"
      color={colorMode === "light" ? "gray.200" : "gray.800"}
    >
      <Stack d={{ base: "flex", md: "none" }} alignItems="center">
        <p>
          © {new Date().getFullYear()} INDÚSTRIA DE MÓVEIS BARTIRA LTDA. Todos
          os direitos reservados.
        </p>
      </Stack>
    </Stack>
  );
};

export default Footer;
