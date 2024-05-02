import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { toast } from "react-toastify";

const Form = ({ pegarProdutos, aoEditar, setAoEditar }) => {
  const ref = useRef();

  useEffect(() => {
    if (aoEditar) {
      const produto = ref.current;
      produto.nome.value = aoEditar.nome;
      produto.descricao.value = aoEditar.descricao;
      produto.preco.value = aoEditar.preco;
      produto.quantidade.value = aoEditar.preco;
      produto.categoria.value = aoEditar.preco;
    }
  }, [aoEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit form");

    const produto = ref.current;

    if (
      !produto.nome.value ||
      !produto.descricao.value ||
      !produto.quantidade.value ||
      !produto.categoria.value ||
      !produto.preco.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    if (aoEditar) {
      console.log("Editando produto:", produto);
      await axios
        .put(`http://localhost:8080/${aoEditar.idCadastro}`, {
          nome: produto.nome.value,
          descricao: produto.descricao.value,
          preco: produto.preco.value,
          quantidade: produto.quantidade.value,
          categoria: produto.categoria.value,
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
      console.log("Adicionando novo produto:", produto);
      await axios
        .post("http://localhost:8080", {
          nome: produto.nome.value,
          descricao: produto.descricao.value,
          preco: produto.preco.value,
          quantidade: produto.quantidade.value,
          categoria: produto.categoria.value,
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
    produto.nome.value = "";
    produto.descricao.value = "";
    produto.preco.value = "";
    produto.quantidade.value = "";
    produto.categoria.value = "";
    setAoEditar(null);
    pegarProdutos();
  };
  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input name="nome" />
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
        <FormLabel>Quantidade</FormLabel>
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
  pegarProdutos: PropTypes.func.isRequired,
  aoEditar: PropTypes.object,
  setAoEditar: PropTypes.func.isRequired,
};

export default Form;
