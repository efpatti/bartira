import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Heading, Stack } from "@chakra-ui/react";
import Form from "./Form";
import Grid from "./Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashBoard = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [aoEditarFornecedor, setAoEditarFornecedor] = useState(null);

  const pegarFornecedores = async () => {
    try {
      const res = await axios.get("http://localhost:8080/fornecedores");
      setFornecedores(
        res.data.sort((a, b) => (a.idFornecedor > b.idFornecedor ? 1 : -1))
      );
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    pegarFornecedores();
  }, []);

  return (
    <>
      <Container
        maxW="800px"
        minH="50vh"
        textAlign="center"
        paddingY="7rem"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Stack direction="column" gap="2rem">
          <Heading as="h2">Fornecedores</Heading>
          <Form
            aoEditarFornecedor={aoEditarFornecedor}
            setAoEditarFornecedor={setAoEditarFornecedor}
            pegarFornecedores={pegarFornecedores}
          />
          <Grid
            fornecedores={fornecedores}
            setFornecedores={setFornecedores}
            setAoEditarFornecedor={setAoEditarFornecedor}
          />
        </Stack>
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
};

export default DashBoard;
