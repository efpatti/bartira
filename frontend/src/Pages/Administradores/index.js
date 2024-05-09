import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Heading } from "@chakra-ui/react";
import FormAdministradores from "./Form";
import GridAdministradores from "./Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashBoardAdministradores = () => {
  useEffect(() => {
    document.title = "Bartira | Administradores";
  }, []);

  const [adms, setAdms] = useState([]);
  const [aoEditarAdm, setAoEditarAdm] = useState(null);

  const pegarAdms = async () => {
    try {
      const res = await axios.get("http://localhost:8080/administradores");
      setAdms(
        res.data.sort((a, b) =>
          a.idAdministrador > b.idAdministrador ? 1 : -1
        )
      );
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    pegarAdms();
  }, []);

  return (
    <>
      <Container maxW="800px" mt="20px" textAlign="center">
        <Heading as="h2">Administradores</Heading>
        <FormAdministradores
          aoEditarAdm={aoEditarAdm}
          setAoEditarAdm={setAoEditarAdm}
          pegarAdms={pegarAdms}
        />
        <GridAdministradores
          adms={adms}
          setAdms={setAdms}
          setAoEditarAdm={setAoEditarAdm}
        />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
};

export default DashBoardAdministradores;
