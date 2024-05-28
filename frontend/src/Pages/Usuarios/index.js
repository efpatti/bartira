import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Stack, Heading } from "@chakra-ui/react";
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
      const res = await axios.get("http://localhost:8080/usuarios");
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
          <Form
            aoEditUsuario={aoEditarUsuario}
            setAoEditarUsuario={setAoEditarUsuario}
            pegarUsuarios={pegarUsuarios}
          />
          <Grid
            usuarios={usuarios}
            setUsuarios={setUsuarios}
            setAoEditarUsuario={setAoEditarUsuario}
          />
        </Stack>
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
};

export default Dashboard;
