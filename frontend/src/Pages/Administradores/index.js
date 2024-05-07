import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Heading } from "@chakra-ui/react";
import FormAdms from "./Form";
import GridAdms from "./Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashBoardAdms = () => {
  useEffect(() => {
    document.title = "Bartira | Administradores";
  }, []);

  const [adms, setAdms] = useState([]);
  const [aoEditarAdm, setAoEditarAdm] = useState(null);

  const pegarAdms = async () => {
    try {
      const res = await axios.get("http://localhost:8080/adms");
      setAdms(res.data.sort((a, b) => (a.idAdms > b.idAdms ? 1 : -1)));
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
        <FormAdms
          aoEditarAdm={aoEditarAdm}
          setAoEditarAdm={setAoEditarAdm}
          pegarAdms={pegarAdms}
        />
        <GridAdms
          adms={adms}
          setAdms={setAdms}
          setAoEditarAdm={setAoEditarAdm}
        />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
};

export default DashBoardAdms;
