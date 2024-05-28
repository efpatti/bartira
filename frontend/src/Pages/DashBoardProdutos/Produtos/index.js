import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Heading, Stack } from "@chakra-ui/react";
import Form from "./Form";
import Grid from "./Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashBoardProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [aoEditarProduto, setAoEditarProduto] = useState(null);

  const pegarProdutos = async () => {
    try {
      const res = await axios.get("http://localhost:8080/produtos");
      setProdutos(
        res.data.sort((a, b) => (a.idProduto > b.idProduto ? 1 : -1))
      );
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    pegarProdutos();
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
          <Heading as="h2">Produtos</Heading>
          <Form
            aoEditarProduto={aoEditarProduto}
            setAoEditarProduto={setAoEditarProduto}
            pegarProdutos={pegarProdutos}
          />
          <Grid
            produtos={produtos}
            setProdutos={setProdutos}
            setAoEditarProduto={setAoEditarProduto}
          />
        </Stack>
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
};

export default DashBoardProdutos;
