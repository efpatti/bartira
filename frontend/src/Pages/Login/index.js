import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Center,
} from "@chakra-ui/react";
import Cliente from "./Cliente";
import Colaborador from "./Colaborador";

function Login() {
  return (
    <Center h="110vh">
      <Box w="40%" minH="50%" borderRadius="13px" border="1px">
        <Tabs isFitted variant="enclosed" colorScheme="green">
          <TabList mb="1em">
            <Tab>Cliente</Tab>
            <Tab>Colaborador</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Cliente />
            </TabPanel>
            <TabPanel>
              <Colaborador />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
}

export default Login;
