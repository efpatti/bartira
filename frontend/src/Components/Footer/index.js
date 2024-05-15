import { Stack, Text, useColorMode } from "@chakra-ui/react";

const Footer = () => {
  const { colorMode } = useColorMode();
  return (
    <Stack
      marginInline="auto"
      p={8}
      bgColor={"darkblue"}
      alignItems="center"
      color={"white"}
      mt={10}
    >
      <Stack d={{ base: "flex", md: "none" }} alignItems="center">
        <Text fontSize="sm" fontWeight="600">
          © {new Date().getFullYear()} INDÚSTRIA DE MÓVEIS BARTIRA LTDA. Todos
          os direitos reservados.
        </Text>
      </Stack>
    </Stack>
  );
};

export default Footer;
