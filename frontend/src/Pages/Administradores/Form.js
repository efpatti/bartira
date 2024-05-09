import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { toast } from "react-toastify";

const FormAdministradores = ({ pegarAdms, aoEditarAdm, setAoEditarAdm }) => {
  const ref = useRef();

  useEffect(() => {
    if (aoEditarAdm) {
      const adm = ref.current;
      adm.nome_adm.value = aoEditarAdm.nome_adm;
      adm.email_adm.value = aoEditarAdm.email_adm;
      adm.cargo_adm.value = aoEditarAdm.cargo_adm;
      adm.cpf_adm.value = aoEditarAdm.cpf_adm;
      adm.endereco_adm.value = aoEditarAdm.endereco_adm;
      adm.senha_adm.value = aoEditarAdm.senha_adm;
    }
  }, [aoEditarAdm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Formulário enviado!");

    const adm = ref.current;

    if (
      !adm.nome_adm.value ||
      !adm.email_adm.value ||
      !adm.cargo_adm.value ||
      !adm.cpf_adm.value ||
      !adm.endereco_adm.value ||
      !adm.senha_adm.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    if (aoEditarAdm) {
      console.log("Editando administrador:", adm);
      await axios
        .put(`http://localhost:8080/administradores/${aoEditarAdm.idAdm}`, {
          nome_adm: adm.nome_adm.value,
          email_adm: adm.email_adm.value,
          cargo_adm: adm.cargo_adm.value,
          cpf_adm: adm.cpf_adm.value,
          endereco_adm: adm.endereco_adm.value,
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
        .post("http://localhost:8080/administradores", {
          nome_adm: adm.nome_adm.value,
          email_adm: adm.email_adm.value,
          cargo_adm: adm.cargo_adm.value,
          cpf_adm: adm.cpf_adm.value,
          endereco_adm: adm.endereco_adm.value,
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
    adm.nome_adm.value = "";
    adm.email_adm.value = "";
    adm.cargo_adm.value = "";
    adm.cpf_adm.value = "";
    adm.endereco_adm.value = "";
    adm.senha_adm.value = "";
    setAoEditarAdm(null);
    pegarAdms();
  };

  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input name="nome_adm" />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input name="email_adm" type="email" />
      </FormControl>
      <FormControl>
        <FormLabel>Cargo</FormLabel>
        <Input name="cargo_adm" type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>CPF</FormLabel>
        <Input name="cpf_adm" />
      </FormControl>
      <FormControl>
        <FormLabel>Endereço</FormLabel>
        <Input name="endereco_adm" type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Senha</FormLabel>
        <Input name="senha_adm" type="password" />
      </FormControl>
      <Button type="submit" variant="ghost">
        Salvar
      </Button>
    </form>
  );
};

// Definindo PropTypes para validar as props
FormAdministradores.propTypes = {
  pegarAdms: PropTypes.func.isRequired,
  aoEditarAdm: PropTypes.object,
  setAoEditarAdm: PropTypes.func.isRequired,
};

export default FormAdministradores;
