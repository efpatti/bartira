import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { toast } from "react-toastify";

const Form = ({ pegarContas, aoEditar, setAoEditar }) => {
  const ref = useRef();

  useEffect(() => {
    if (aoEditar) {
      const conta = ref.current;
      conta.nome.value = aoEditar.nome;
      conta.descricao.value = aoEditar.descricao;
      conta.preco.value = aoEditar.preco;
      conta.quantidade.value = aoEditar.preco;
      conta.categoria.value = aoEditar.preco;
    }
  }, [aoEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit form");

    const conta = ref.current;

    if (
      !conta.nome.value ||
      !conta.descricao.value ||
      !conta.quantidade.value ||
      !conta.categoria.value ||
      !conta.preco.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    if (aoEditar) {
      console.log("Editando conta:", conta);
      await axios
        .put(`http://localhost:8080/${aoEditar.idCadastro}`, {
          nome: conta.nome.value,
          descricao: conta.descricao.value,
          preco: conta.preco.value,
          quantidade: conta.quantidade.value,
          categoria: conta.categoria.value,
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
      console.log("Adicionando nova conta:", conta);
      await axios
        .post("http://localhost:8080", {
          nome: conta.nome.value,
          descricao: conta.descricao.value,
          preco: conta.preco.value,
          quantidade: conta.quantidade.value,
          categoria: conta.categoria.value,
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
    conta.nome.value = "";
    conta.descricao.value = "";
    conta.preco.value = "";
    conta.quantidade.value = "";
    conta.categoria.value = "";
    setAoEditar(null);
    pegarContas();
  };
  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input name="nome_financa" />
      </FormControl>
      <FormControl>
        <FormLabel>Descrição</FormLabel>
        <Input name="descricao" type="descricao" />
      </FormControl>

      <FormControl>
        <FormLabel>Categoria</FormLabel>
        <Input name="categoria" type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Preço</FormLabel>
        <Input name="preco" type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Status</FormLabel>
        <Input name="quantidade" type="text" />
      </FormControl>
      <Button type="submit" variant="ghost">
        Salvar
      </Button>
    </form>
  );
};

// Definindo PropTypes para validar as props
Form.propTypes = {
  pegarContas: PropTypes.func.isRequired,
  aoEditar: PropTypes.object,
  setAoEditar: PropTypes.func.isRequired,
};

export default Form;
