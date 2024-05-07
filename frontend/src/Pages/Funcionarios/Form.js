import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { toast } from "react-toastify";

const FormFuncionarios = ({
  pegarFuncionarios,
  aoEditarFuncionario,
  setAoEditarFuncionario,
}) => {
  const ref = useRef();

  useEffect(() => {
    if (aoEditarFuncionario) {
      const funcionario = ref.current;
      funcionario.nome_funcionario.value = aoEditarFuncionario.nome_funcionario;
      funcionario.email_funcionario.value =
        aoEditarFuncionario.email_funcionario;
      funcionario.cargo_funcionario.value =
        aoEditarFuncionario.cargo_funcionario;
      funcionario.cpf_funcionario.value = aoEditarFuncionario.cpf_funcionario;
      funcionario.endereco_funcionario.value =
        aoEditarFuncionario.endereco_funcionario;
      funcionario.senha_funcionario.value =
        aoEditarFuncionario.senha_funcionario;
    }
  }, [aoEditarFuncionario]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Formulário enviado!");

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
    if (aoEditarFuncionario) {
      console.log("Editando funcionário:", funcionario);
      await axios
        .put(
          `http://localhost:8080/funcionarios/${aoEditarFuncionario.idFuncionario}`,
          {
            nome_funcionario: funcionario.nome_funcionario.value,
            email_funcionario: funcionario.email_funcionario.value,
            cargo_funcionario: funcionario.cargo_funcionario.value,
            cpf_funcionario: funcionario.cpf_funcionario.value,
            endereco_funcionario: funcionario.endereco_funcionario.value,
            senha_funcionario: funcionario.senha_funcionario.value,
          }
        )
        .then(({ data }) => {
          console.log("Resposta do edit:", data);
          toast.success(data);
        })
        .catch(({ data }) => {
          console.error("Erro ao editar:", data);
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
          console.log("Resposta da adição:", data);
          toast.success(data);
        })
        .catch(({ data }) => {
          console.error("Erro ao adicionar:", data);
          toast.error(data);
        });
    }
    funcionario.nome_funcionario.value = "";
    funcionario.email_funcionario.value = "";
    funcionario.cargo_funcionario.value = "";
    funcionario.cpf_funcionario.value = "";
    funcionario.endereco_funcionario.value = "";
    funcionario.senha_funcionario.value = "";
    setAoEditarFuncionario(null);
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
  aoEditarFuncionario: PropTypes.object,
  setAoEditarFuncionario: PropTypes.func.isRequired,
};

export default FormFuncionarios;
