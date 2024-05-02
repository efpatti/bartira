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
      conta.nome_conta.value = aoEditar.nome_conta;
      conta.descricao_conta.value = aoEditar.descricao_conta;
      conta.preco_conta.value = aoEditar.preco_conta;
      conta.quantidade_conta.value = aoEditar.preco_conta;
      conta.categoria_conta.value = aoEditar.preco_conta;
    }
  }, [aoEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit form");

    const conta = ref.current;

    if (
      !conta.nome_conta.value ||
      !conta.descricao_conta.value ||
      !conta.quantidade_conta.value ||
      !conta.categoria_conta.value ||
      !conta.preco_conta.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    if (aoEditar) {
      console.log("Editando conta:", conta);
      await axios
        .put(`http://localhost:8080/${aoEditar.idConta}`, {
          nome_conta: conta.nome_conta.value,
          descricao_conta: conta.descricao_conta.value,
          preco_conta: conta.preco_conta.value,
          quantidade_conta: conta.quantidade_conta.value,
          categoria_conta: conta.categoria_conta.value,
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
        .post("http://localhost:8080/", {
          nome_conta: conta.nome_conta.value,
          descricao_conta: conta.descricao_conta.value,
          preco_conta: conta.preco_conta.value,
          quantidade_conta: conta.quantidade_conta.value,
          categoria_conta: conta.categoria_conta.value,
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
    conta.nome_conta.value = "";
    conta.descricao_conta.value = "";
    conta.preco_conta.value = "";
    conta.quantidade_conta.value = "";
    conta.categoria_conta.value = "";
    setAoEditar(null);
    pegarContas();
  };
  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>nome_conta</FormLabel>
        <Input name="nome_conta" />
      </FormControl>
      <FormControl>
        <FormLabel>Descrição</FormLabel>
        <Input name="descricao_conta" type="descricao" />
      </FormControl>

      <FormControl>
        <FormLabel>Categoria</FormLabel>
        <Input name="categoria_conta" type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Preço</FormLabel>
        <Input name="preco_conta" type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Status</FormLabel>
        <Input name="status_conta" type="text" />
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
