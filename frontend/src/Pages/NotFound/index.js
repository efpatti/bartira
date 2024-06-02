import {
  Box,
  Link,
  Text,
  Button,
  Stack,
  Heading,
  Image,
} from "@chakra-ui/react";

function NotFound() {
  return (
    <Box textAlign="center">
      <Heading as="h1" size="xl" mb="6">
        Oops!
      </Heading>
      <Image src="/404-illustration.svg" alt="Página não encontrada" mb="6" />
      <Text fontSize="xl" mb="6">
        Parece que você se perdeu.
      </Text>
      <Text fontSize="lg" mb="6">
        Mas não se preocupe, estamos aqui para ajudar!
      </Text>
      <Stack direction="row" spacing="4" justify="center">
        <Link as={Button} href="/" colorScheme="blue" size="lg">
          Voltar à página inicial
        </Link>
        <Link as={Button} href="/contato" colorScheme="green" size="lg">
          Entre em contato conosco
        </Link>
      </Stack>
    </Box>
  );
}

export default NotFound;
