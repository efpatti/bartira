import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Heading } from "@chakra-ui/react";
import Form from "./Form";
import Grid from "./Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Bartira | Usuários";
  }, []);

  const [usuarios, setUsuarios] = useState([]);
  const [aoEditarUsuario, setAoEditarUsuario] = useState(null);

  const pegarUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:8081/usuarios");
      setUsuarios(
        res.data.sort((a, b) => (a.idUsuario > b.idUsuario ? 1 : -1))
      );
    } catch (error) {
      toast.error("Erro ao carregar usuários");
    }
  };

  useEffect(() => {
    pegarUsuarios();
  }, []);

  return (
    <>
      <Container maxW="800px" mt="20px" textAlign="center">
        <Heading as="h2">Usuários</Heading>
        <Form
          aoEditarUsuario={aoEditarUsuario}
          setAoEditarUsuario={setAoEditarUsuario}
          pegarUsuarios={pegarUsuarios}
        />
        <Grid
          usuarios={usuarios}
          setUsuarios={setUsuarios}
          setAoEditarUsuario={setAoEditarUsuario}
        />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
};

export default Dashboard;
