import { useAuth } from "../../hooks/useAuth"; // Alteração aqui
import {
  Container,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Box,
  Icon,
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { FaRegHandshake } from "react-icons/fa6";

function Logado() {
  const { logout, isAuthenticated, user } = useAuth(); // Alteração aqui

  const handleLogout = () => {
    logout();
  };

  const { userType } = useAuth();
  console.log(userType);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <Container
      maxW="800px"
      minH="50vh"
      textAlign="center"
      paddingY="7rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Text mt={50} mb={5}>Conectado como:</Text>
      <Heading fontSize={30} >{user.email}</Heading>

      <Box textAlign="center" mt={12}>
        <Icon as={FaRegHandshake} boxSize="100px" color="darkblue" />
      </Box>


    </Container>
  );
}
export default Logado;
