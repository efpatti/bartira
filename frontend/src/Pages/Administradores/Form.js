import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { toast } from "react-toastify";

const FormAdms = ({ pegarAdms, aoEditarAdm, setAoEditarAdm }) => {
  const ref = useRef();

  useEffect(() => {
    if (aoEditarAdm) {
      const adm = ref.current;
      adm.email_adm.value = aoEditarAdm.email_adm;
      adm.senha_adm.value = aoEditarAdm.senha_adm;
    }
  }, [aoEditarAdm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Formulário enviado!");

    const adm = ref.current;

    if (!adm.email_adm.value || !adm.senha_adm.value) {
      return toast.warn("Preencha todos os campos!");
    }
    if (aoEditarAdm) {
      console.log("Editando administrador:", adm);
      await axios
        .put(`http://localhost:8080/adms/${aoEditarAdm.idAdm}`, {
          email_adm: adm.email_adm.value,
          senha_adm: adm.senha_adm.value,
        })
        .then(({ data }) => {
          console.log("Resposta do edit:", data);
          toast.success(data);
        })
        .catch(({ data }) => {
          console.error("Erro ao editar:", data);
          toast.error(data);
        });
    } else {
      console.log("Adicionando novo administrador:", adm);
      await axios
        .post("http://localhost:8080/adms", {
          email_adm: adm.email_adm.value,
          senha_adm: adm.senha_adm.value,
        })
        .then(({ data }) => {
          console.log("Resposta da adição:", data);
          toast.success(data);
        })
        .catch(({ data }) => {
          console.error("Erro ao adicionar:", data);
          toast.error(data);
        });
    }
    adm.email_adm.value = "";
    adm.senha_adm.value = "";
    setAoEditarAdm(null);
    pegarAdms();
  };

  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input name="email_adm" type="email" />
      </FormControl>
      <FormControl>
        <FormLabel>Senha</FormLabel>
        <Input name="senha_adm" type="text" />
      </FormControl>
      <Button type="submit" variant="ghost">
        Salvar
      </Button>
    </form>
  );
};

// Definindo PropTypes para validar as props
FormAdms.propTypes = {
  pegarAdms: PropTypes.func.isRequired,
  aoEditarAdm: PropTypes.object,
  setAoEditarAdm: PropTypes.func.isRequired,
};

export default FormAdms;
