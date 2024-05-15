import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const Form = ({ pegarUsuarios, aoEditarUsuario, setAoEditarUsuario }) => {
  const ref = useRef();
  useEffect(() => {
    if (aoEditarUsuario) {
      const usuario = ref.current;
      usuario.nome.value = aoEditarUsuario.nome;
      usuario.email.value = aoEditarUsuario.email;
      usuario.cargo.value = aoEditarUsuario.cargo;
      usuario.cpf.value = aoEditarUsuario.cpf;
      usuario.endereco.value = aoEditarUsuario.endereco;
      usuario.tipo.value = aoEditarUsuario.tipo;
      usuario.senha.value = aoEditarUsuario.senha;
    }
  }, [aoEditarUsuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Formulário enviado!");

    const usuario = ref.current;

    if (
      !usuario.nome.value ||
      !usuario.email.value ||
      !usuario.cargo.value ||
      !usuario.cpf.value ||
      !usuario.endereco.value ||
      !usuario.tipo.value ||
      !usuario.senha.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    if (aoEditarUsuario) {
      console.log("Editando usuário:", usuario);
      await axios
        .put(`http://localhost:8081/usuarios/${aoEditarUsuario.idUsuario}`, {
          nome: usuario.nome.value,
          email: usuario.email.value,
          cargo: usuario.cargo.value,
          cpf: usuario.cpf.value,
          endereco: usuario.endereco.value,
          tipo: usuario.tipo.value,
          senha: usuario.senha.value,
        })
        .then(({ data }) => {
          console.log("Resposta do edit:", data);
          toast.success(data);
        })
        .catch(({ response }) => {
          console.error("Erro ao editar:", response.data);
          toast.error(response.data.message);
        });
    } else {
      console.log("Adicionando novo usuário:", usuario);
      await axios
        .post("http://localhost:8081/usuarios", {
          nome: usuario.nome.value,
          email: usuario.email.value,
          cargo: usuario.cargo.value,
          cpf: usuario.cpf.value,
          endereco: usuario.endereco.value,
          tipo: usuario.tipo.value,
          senha: usuario.senha.value,
        })
        .then(({ data }) => {
          console.log("Resposta da adição:", data);
          toast.success(data);
        })
        .catch(({ response }) => {
          console.error("Erro ao adicionar:", response.data);
          toast.error(response.data.message);
        });
    }
    usuario.nome.value = "";
    usuario.email.value = "";
    usuario.cargo.value = "";
    usuario.cpf.value = "";
    usuario.endereco.value = "";
    usuario.tipo.value = "";
    usuario.senha.value = "";
    setAoEditarUsuario(null);
    pegarUsuarios();
  };

  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input name="nome" defaultValue="" />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input name="email" type="email" defaultValue="" />
      </FormControl>
      <FormControl>
        <FormLabel>Cargo</FormLabel>
        <Input name="cargo" type="text" defaultValue="" />
      </FormControl>
      <FormControl>
        <FormLabel>CPF</FormLabel>
        <Input name="cpf" defaultValue="" />
      </FormControl>
      <FormControl>
        <FormLabel>Endereço</FormLabel>
        <Input name="endereco" type="text" defaultValue="" />
      </FormControl>
      <FormControl>
        <FormLabel>Tipo</FormLabel>
        <Select name="tipo" defaultValue="Funcionário">
          <option value="Funcionário">Funcionário</option>
          <option value="Administrador">Administrador</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Senha</FormLabel>
        <Input name="senha" type="password" defaultValue="" />
      </FormControl>
      <Button type="submit" variant="ghost">
        Salvar
      </Button>
    </form>
  );
};

// Definindo PropTypes para validar as props
Form.propTypes = {
  pegarUsuarios: PropTypes.func.isRequired,
  aoEditarUsuario: PropTypes.object,
  setAoEditarUsuario: PropTypes.func.isRequired,
};

export default Form;
