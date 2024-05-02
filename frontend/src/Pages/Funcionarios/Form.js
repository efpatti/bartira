import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { toast } from "react-toastify";

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.cargo.value = onEdit.cargo;
      user.cpf.value = onEdit.cpf;
      user.endereco.value = onEdit.endereco;
      user.senha.value = onEdit.senha;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit form");

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.cargo.value ||
      !user.cpf.value ||
      !user.endereco.value ||
      !user.senha.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    if (onEdit) {
      console.log("Editando usuário:", user);
      await axios
        .put(`http://localhost:8080/${onEdit.idCadastro}`, {
          nome: user.nome.value,
          email: user.email.value,
          cargo: user.cargo.value,
          cpf: user.cpf.value,
          endereco: user.endereco.value,
          senha: user.senha.value,
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
      console.log("Adicionando novo usuário:", user);
      await axios
        .post("http://localhost:8080", {
          nome: user.nome.value,
          email: user.email.value,
          cargo: user.cargo.value,
          cpf: user.cpf.value,
          endereco: user.endereco.value,
          senha: user.senha.value,
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
    user.nome.value = "";
    user.email.value = "";
    user.cargo.value = "";
    user.cpf.value = "";
    user.endereco.value = "";
    user.senha.value = "";
    setOnEdit(null);
    getUsers();
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
Form.propTypes = {
  getUsers: PropTypes.func.isRequired,
  onEdit: PropTypes.object,
  setOnEdit: PropTypes.func.isRequired,
};

export default Form;
