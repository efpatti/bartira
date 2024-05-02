import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Heading } from "@chakra-ui/react";
import Form from "./Form";
import Grid from "./Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashBoardFinanceiro = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [aoEditar, setAoEditar] = useState(null);

  const pegarFuncionarios = async () => {
    try {
      const res = await axios.get("http://localhost:8080/");
      setFuncionarios(res.data.sort((a, b) => (a.id > b.id ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    pegarFuncionarios();
  }, []);

  return (
    <>
      <Container maxW="800px" mt="20px" textAlign="center">
        <Heading as="h2">Contas</Heading>
        <Form
          aoEditar={aoEditar}
          setAoEditar={setAoEditar}
          pegarFuncionarios={pegarFuncionarios}
        />
        <Grid
          funcionarios={funcionarios}
          setAoEditar={setAoEditar}
          setOnEdit={setAoEditar}
        />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
};

export default DashBoardFinanceiro;
