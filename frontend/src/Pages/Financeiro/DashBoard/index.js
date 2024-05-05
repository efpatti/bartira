import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Heading } from "@chakra-ui/react";
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
      setContas(res.data.sort((a, b) => (a.idProduto > b.idProduto ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    pegarContas();
  }, []);

  return (
    <>
      <Container maxW="800px" mt="20px" textAlign="center">
        <Heading as="h2">Produtos</Heading>
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
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
};

export default DashBoard;
