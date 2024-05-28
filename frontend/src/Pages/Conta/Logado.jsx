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
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

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
      <Text>{user.email}</Text>
    </Container>
  );
}
export default Logado;
