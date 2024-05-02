import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Center,
} from "@chakra-ui/react";
import CadClientes from "./CadClientes";
import CadFornecedores from "./CadFornecedores";
import { useEffect } from "react";

function Uteis() {
  useEffect(() => {
    document.title = "Bartira | Utilidades";
  }, []);

  return (
    <Center h="100vh">
      <Box w="50%" h="60%" borderRadius="13px" border="1px">
        <Tabs isFitted variant="enclosed" colorScheme="green">
          <TabList mb="1em">
            <Tab>Clientes</Tab>
            <Tab>Fornecedores</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CadClientes />
            </TabPanel>
            <TabPanel>
              <CadFornecedores />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
}

export default Uteis;
