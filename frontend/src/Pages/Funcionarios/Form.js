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
      funcionario.nome.value = aoEditar.nome;
      funcionario.email.value = aoEditar.email;
      funcionario.cargo.value = aoEditar.cargo;
      funcionario.cpf.value = aoEditar.cpf;
      funcionario.endereco.value = aoEditar.endereco;
      funcionario.senha.value = aoEditar.senha;
    }
  }, [aoEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit form");

    const funcionario = ref.current;

    if (
      !funcionario.nome.value ||
      !funcionario.email.value ||
      !funcionario.cargo.value ||
      !funcionario.cpf.value ||
      !funcionario.endereco.value ||
      !funcionario.senha.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    if (aoEditar) {
      console.log("Editando funcionário:", funcionario);
      await axios
        .put(`http://localhost:8080/funcionarios${aoEditar.idFuncionario}`, {
          nome: funcionario.nome.value,
          email: funcionario.email.value,
          cargo: funcionario.cargo.value,
          cpf: funcionario.cpf.value,
          endereco: funcionario.endereco.value,
          senha: funcionario.senha.value,
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
          nome: funcionario.nome.value,
          email: funcionario.email.value,
          cargo: funcionario.cargo.value,
          cpf: funcionario.cpf.value,
          endereco: funcionario.endereco.value,
          senha: funcionario.senha.value,
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
    funcionario.nome.value = "";
    funcionario.email.value = "";
    funcionario.cargo.value = "";
    funcionario.cpf.value = "";
    funcionario.endereco.value = "";
    funcionario.senha.value = "";
    setAoEditar(null);
    pegarFuncionarios();
  };

  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input name="nome" />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input name="email" type="email" />
      </FormControl>
      <FormControl>
        <FormLabel>Cargo</FormLabel>
        <Input name="cargo" type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>CPF</FormLabel>
        <Input name="cpf" />
      </FormControl>
      <FormControl>
        <FormLabel>Endereço</FormLabel>
        <Input name="endereco" type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Senha</FormLabel>
        <Input name="senha" type="password" />
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
