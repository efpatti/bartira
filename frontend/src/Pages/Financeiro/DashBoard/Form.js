import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { toast } from "react-toastify";

const FormContas = ({ pegarContas, aoEditarConta, setAoEditarConta }) => {
  const ref = useRef();

  useEffect(() => {
    if (aoEditarConta) {
      const conta = ref.current;
      conta.nome_conta.value = aoEditarConta.nome_conta;
      conta.descricao_conta.value = aoEditarConta.descricao_conta;
      conta.preco_conta.value = aoEditarConta.preco_conta;
      conta.categoria_conta.value = aoEditarConta.categoria_conta;
    }
  }, [aoEditarConta]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Formulário enviado!");

    const conta = ref.current;

    if (
      !conta.nome_conta.value ||
      !conta.descricao_conta.value ||
      !conta.preco_conta.value ||
      !conta.categoria_conta.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    if (aoEditarConta) {
      console.log("Editando conta:", conta);
      await axios
        .put(`http://localhost:8080/contas/${aoEditarConta.idConta}`, {
          nome_conta: conta.nome_conta.value,
          descricao_conta: conta.descricao_conta.value,
          preco_conta: conta.preco_conta.value,
          categoria_conta: conta.categoria_conta.value,
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
      console.log("Adicionando novo conta:", conta);
      await axios
        .post("http://localhost:8080/contas/", {
          nome_conta: conta.nome_conta.value,
          descricao_conta: conta.descricao_conta.value,
          preco_conta: conta.preco_conta.value,
          categoria_conta: conta.categoria_conta.value,
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
    conta.nome_conta.value = "";
    conta.descricao_conta.value = "";
    conta.preco_conta.value = "";
    conta.categoria_conta.value = "";
    setAoEditarConta(null);
    pegarContas();
  };

  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input name="nome_conta" />
      </FormControl>
      <FormControl>
        <FormLabel>Descrição</FormLabel>
        <Input name="descricao_conta" type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Preço</FormLabel>
        <Input name="preco_conta" type="text" />
      </FormControl>

      <FormControl>
        <FormLabel>Categoria</FormLabel>
        <Input name="categoria_conta" type="text" />
      </FormControl>
      <Button type="submit" variant="ghost">
        Salvar
      </Button>
    </form>
  );
};

// Definindo PropTypes para validar as props
FormContas.propTypes = {
  pegarContas: PropTypes.func.isRequired,
  aoEditarConta: PropTypes.object,
  setAoEditarConta: PropTypes.func.isRequired,
};

export default FormContas;
