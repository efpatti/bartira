import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Heading } from "@chakra-ui/react";
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
      setProdutos(res.data.sort((a, b) => (a.idProduto> b.idProduto ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    pegarProdutos();
  }, []);

  return (
    <>
      <Container maxW="800px" mt="20px" textAlign="center">
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
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
};

export default DashBoardProdutos;
