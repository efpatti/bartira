import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Center,
} from "@chakra-ui/react";
import DashBoard from "./DashBoard";
import Lucros from "./Lucros";
import Despesas from "./Despesas";

function Financeiro() {
  return (
    <Center height="100vh">
      <Box w="50%" borderRadius="13px" border="1px">
        <Tabs isFitted variant="enclosed" colorScheme="green">
          <TabList mb="1em">
            <Tab>Dashboard</Tab>
            <Tab>Lucros</Tab>
            <Tab>Despesas</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DashBoard />
            </TabPanel>
            <TabPanel>
              <Lucros />
            </TabPanel>
            <TabPanel>
              <Despesas />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
}

export default Financeiro;
