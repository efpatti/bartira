import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Heading,
  Text,
  Grid,
  Stack,
  Box,
  Tabs,
  TabPanels,
  TabPanel,
  TabList,
  Tab,
} from "@chakra-ui/react";
import FormFinanceiro from "./FormFinanceiro";
import GridFinanceiro from "./GridFinanceiro";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashBoard = () => {
  const [contas, setContas] = useState([]);
  const [aoEditarConta, setAoEditarConta] = useState(null);
  const [receber, setReceber] = useState(0);
  const [pagar, setPagar] = useState(0);

  const pegarContas = async () => {
    try {
      const res = await axios.get("http://localhost:8080/contas");
      setContas(res.data.sort((a, b) => (a.idProduto > b.idProduto ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    pegarContas();
    let totalReceber = 0;
    let totalPagar = 0;

    contas.forEach((conta) => {
      if (
        conta.categoria_conta === "Receber" &&
        conta.status_conta === "Concluida"
      ) {
        totalReceber += parseFloat(conta.preco_conta);
      }
    });

    contas.forEach((conta) => {
      if (
        conta.categoria_conta === "Pagar" &&
        conta.status_conta === "Concluida"
      ) {
        totalPagar += parseFloat(conta.preco_conta);
      }
    });

    setPagar(totalPagar);
    setReceber(totalReceber);
  }, [contas]);

  return (
    <>
      <Container h="800px" align="center" justify="center">
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Gerenciamento</Tab>
            <Tab>Dashboard</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Heading as="h2">Contas</Heading>
              <FormFinanceiro
                aoEditarConta={aoEditarConta}
                setAoEditarConta={setAoEditarConta}
                pegarContas={pegarContas}
              />
              <GridFinanceiro
                contas={contas}
                setContas={setContas}
                setAoEditarConta={setAoEditarConta}
              />
            </TabPanel>
            <TabPanel>
              <Grid templateRows="repeat(2, 1fr)" mt="3rem" gap="5">
                <Box>
                  <Grid templateColumns="repeat(2, 1fr)" mt="3rem" border="1px">
                    <Box boxShadow="md">
                      <Stack direction="column" spacing="3">
                        <Text fontSize="xl" bg="red.200" borderBottom="1px">
                          Pagar
                        </Text>
                        <Text fontSize="lg">R$ {pagar.toFixed(2)}</Text>
                      </Stack>
                    </Box>
                    <Box boxShadow="md" borderLeft="1px">
                      <Stack direction="column" spacing="3">
                        <Text fontSize="xl" bg="green.200" borderBottom="1px">
                          Receber
                        </Text>
                        <Text fontSize="lg">R$ {receber.toFixed(2)}</Text>
                      </Stack>
                    </Box>
                  </Grid>
                </Box>
                <Box>
                  <Box boxShadow="md">
                    <Stack direction="column" spacing="3">
                      <Text
                        fontSize="xl"
                        bg={
                          pagar < receber
                            ? "green.200"
                            : pagar > receber
                            ? "red.200"
                            : "gray.200"
                        }
                        borderBottom="1px"
                      >
                        {pagar < receber && "Lucrando!"}
                        {pagar > receber && "Falindo!"}
                        {pagar === receber && "Estaca zero!"}
                      </Text>
                      <Text fontSize="lg">R$ {receber - pagar.toFixed(2)}</Text>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <ToastContainer autoClose={3000} position="bottom-left" />
      </Container>
    </>
  );
};

export default DashBoard;
