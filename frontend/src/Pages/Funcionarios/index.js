import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Heading } from "@chakra-ui/react";
import FormFuncionarios from "./Form";
import GridFuncionarios from "./Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [aoEditar, setAoEditar] = useState(null);

  const pegarFuncionarios = async () => {
    try {
      const res = await axios.get("http://localhost:8080/funcionarios");
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
        <Heading as="h2">Funcionários</Heading>
        <FormFuncionarios
          aoEditar={aoEditar}
          setAoEditar={setAoEditar}
          pegarFuncionarios={pegarFuncionarios}
        />
        <GridFuncionarios
          funcionarios={funcionarios}
          setAoEditar={setAoEditar}
          setOnEdit={setAoEditar}
        />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
};

export default DashboardFuncionarios;
