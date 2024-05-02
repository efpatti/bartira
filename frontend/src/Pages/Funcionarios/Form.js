import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { toast } from "react-toastify";

const FormFuncionarios = ({ pegarFuncionarios, aoEditar, setAoEditar }) => {
  const ref = useRef();

  useEffect(() => {
    if (aoEditar) {
      const funcionario = ref.current;
      funcionario.nome_funcionario.value = aoEditar.nome;
      funcionario.email_funcionario.value = aoEditar.email;
      funcionario.cargo_funcionario.value = aoEditar.cargo;
      funcionario.cpf_funcionario.value = aoEditar.cpf;
      funcionario.endereco_funcionario.value = aoEditar.endereco;
      funcionario.senha_funcionario.value = aoEditar.senha;
    }
  }, [aoEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit form");

    const funcionario = ref.current;

    if (
      !funcionario.nome_funcionario.value ||
      !funcionario.email_funcionario.value ||
      !funcionario.cargo_funcionario.value ||
      !funcionario.cpf_funcionario.value ||
      !funcionario.endereco_funcionario.value ||
      !funcionario.senha_funcionario.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    if (aoEditar) {
      console.log("Editando funcionário:", funcionario);
      await axios
        .put(`http://localhost:8080/funcionarios/${aoEditar.idFuncionario}`, {
          nome: funcionario.nome_funcionario.value,
          email: funcionario.email_funcionario.value,
          cargo: funcionario.cargo_funcionario.value,
          cpf: funcionario.cpf_funcionario.value,
          endereco: funcionario.endereco_funcionario.value,
          senha: funcionario.senha_funcionario.value,
        })
        .then(({ data }) => {
          console.log("Edit response:", data);
          toast.success(data);
        })
        .catch(({ data }) => {
          console.error("Edit error:", data);
          toast.error(data);
        });
    } else {
      console.log("Adicionando novo funcionário:", funcionario);
      await axios
        .post("http://localhost:8080/funcionarios", {
          nome_funcionario: funcionario.nome_funcionario.value,
          email_funcionario: funcionario.email_funcionario.value,
          cargo_funcionario: funcionario.cargo_funcionario.value,
          cpf_funcionario: funcionario.cpf_funcionario.value,
          endereco_funcionario: funcionario.endereco_funcionario.value,
          senha_funcionario: funcionario.senha_funcionario.value,
        })
        .then(({ data }) => {
          console.log("Add response:", data);
          toast.success(data);
        })
        .catch(({ data }) => {
          console.error("Add error:", data);
          toast.error(data);
        });
    }
    funcionario.nome_funcionario.value = "";
    funcionario.email_funcionario.value = "";
    funcionario.cargo_funcionario.value = "";
    funcionario.cpf_funcionario.value = "";
    funcionario.endereco_funcionario.value = "";
    funcionario.senha_funcionario.value = "";
    setAoEditar(null);
    pegarFuncionarios();
  };

  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input name="nome_funcionario" />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input name="email_funcionario" type="email" />
      </FormControl>
      <FormControl>
        <FormLabel>Cargo</FormLabel>
        <Input name="cargo_funcionario" type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>CPF</FormLabel>
        <Input name="cpf_funcionario" />
      </FormControl>
      <FormControl>
        <FormLabel>Endereço</FormLabel>
        <Input name="endereco_funcionario" type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Senha</FormLabel>
        <Input name="senha_funcionario" type="password" />
      </FormControl>
      <Button type="submit" variant="ghost">
        Salvar
      </Button>
    </form>
  );
};

// Definindo PropTypes para validar as props
FormFuncionarios.propTypes = {
  pegarFuncionarios: PropTypes.func.isRequired,
  aoEditar: PropTypes.object,
  setAoEditar: PropTypes.func.isRequired,
};

export default FormFuncionarios;
