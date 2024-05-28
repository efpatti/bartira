import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Heading, Stack } from "@chakra-ui/react";
import Form from "./Form";
import Grid from "./Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [produtos, setProdutos] = useState([]);
  const [clientes] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [aoEditarVenda, setAoEditarVenda] = useState(null);

  const pegarProdutos = async () => {
    try {
      const res = await axios.get("http://localhost:8080/produtos");
      setProdutos(
        res.data.sort((a, b) => (a.idProduto > b.idProduto ? 1 : -1))
      );
    } catch (error) {
      toast.error("Erro ao carregar produtos!");
    }
  };

  const pegarVendas = async () => {
    try {
      const res = await axios.get("http://localhost:8080/vendas");
      setVendas(res.data.sort((a, b) => (a.idVenda > b.idVenda ? 1 : -1)));
    } catch (error) {
      toast.error("Erro ao carregar vendas!");
    }
  };

  useEffect(() => {
    pegarVendas();
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
        <Heading as="h2">Vendas</Heading>
        <Stack direction="column" gap="2rem">
          <Form
            aoEditarVenda={aoEditarVenda}
            setAoEditarVenda={setAoEditarVenda}
            pegarVendas={pegarVendas}
            produtos={produtos}
            clientes={clientes}
            vendas={vendas}
          />
          <Grid
            vendas={vendas}
            setVendas={setVendas}
            setAoEditarVenda={setAoEditarVenda}
          />
        </Stack>
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
};

export default Index;
