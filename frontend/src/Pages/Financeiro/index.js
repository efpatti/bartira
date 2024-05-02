import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Center,
} from "@chakra-ui/react";
import { useEffect } from "react";
import DashBoardFinanceiro from "./DashBoard/Form";
import Lucros from "./Lucros";
import Despesas from "./Despesas";

function Financeiro() {
  useEffect(() => {
    document.title = "Bartira | Financeiro";
  }, []);
  return (
    <Center h="100vh">
      <Box w="50%" borderRadius="13px" border="1px">
        <Tabs isFitted variant="enclosed" colorScheme="green">
          <TabList mb="1em">
            <Tab>Dashboard</Tab>
            <Tab>Despesas</Tab>
            <Tab>Lucros</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DashBoardFinanceiro />
            </TabPanel>
            <TabPanel>
              <Despesas />
            </TabPanel>
            <TabPanel>
              <Lucros />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
}

export default Financeiro;
