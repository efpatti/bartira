import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Heading } from "@chakra-ui/react";
import FormFuncionarios from "./Form";
import GridFuncionarios from "./Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardFuncionarios = () => {
  useEffect(() => {
    document.title = "Bartira | Funcionários";
  }, []);

  const [funcionarios, setFuncionarios] = useState([]);
  const [aoEditarFuncionario, setAoEditarFuncionario] = useState(null);

  const pegarFuncionarios = async () => {
    try {
      const res = await axios.get("http://localhost:8080/funcionarios");
      setFuncionarios(res.data.sort((a, b) => (a.idFuncionario > b.idFuncionario ? 1 : -1)));
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
          aoEditarFuncionario={aoEditarFuncionario}
          setAoEditarFuncionario={setAoEditarFuncionario}
          pegarFuncionarios={pegarFuncionarios}
        />
        <GridFuncionarios
          funcionarios={funcionarios}
          setFuncionarios={setFuncionarios}
          setAoEditarFuncionario={setAoEditarFuncionario}
        />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
};

export default DashboardFuncionarios;
