import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Heading, Stack } from "@chakra-ui/react";
import Form from "./Form";
import Grid from "./Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashBoard = () => {
  const [contas, setContas] = useState([]);
  const [aoEditarConta, setAoEditarConta] = useState(null);

  const pegarContas = async () => {
    try {
      const res = await axios.get("http://localhost:8080/contas");
      setContas(res.data.sort((a, b) => (a.idConta > b.idConta ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    pegarContas();
  });

  return (
    <>
      <Container
        mt={50}
        maxW="800px"
        minH="50vh"
        textAlign="center"
        paddingY="7rem"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading as="h2">Financeiro</Heading>
        <Stack direction="column" gap="2rem">
          <Form
            aoEditarConta={aoEditarConta}
            setAoEditarConta={setAoEditarConta}
            pegarContas={pegarContas}
          />
          <Grid
            contas={contas}
            setContas={setContas}
            setAoEditarConta={setAoEditarConta}
          />
        </Stack>
        <ToastContainer autoClose={3000} position="bottom-left" />
      </Container>
    </>
  );
};

export default DashBoard;
