import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Center,
} from "@chakra-ui/react";
import Produtos from "./Produtos";
import Estoque from "./Estoque";

function DashBoard() {
  return (
    <Center h="100vh">
      <Box w="50%" borderRadius="13px" border="1px">
        <Tabs isFitted variant="enclosed" colorScheme="green">
          <TabList mb="1em">
            <Tab>Produtos</Tab>
            <Tab>Estoque</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Produtos />
            </TabPanel>
            <TabPanel>
              <Estoque />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
}

export default DashBoard;
