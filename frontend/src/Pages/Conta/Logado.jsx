import { useAuth } from "../../hooks/useAuth"; // Alteração aqui
import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Link,
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
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Link as={Tab} href="/usuarios">
            Usuários
          </Link>
          <Tab>Two</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
export default Logado;
