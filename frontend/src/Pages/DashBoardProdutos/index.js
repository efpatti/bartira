import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Produtos from "./Produtos";
import Estoque from "./Estoque";

function DashBoardProdutos() {
  return (
    <Container h="800px" align="center" justify="center">
      <Tabs isFitted variant="enclosed">
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
    </Container>
  );
}

export default DashBoardProdutos;
