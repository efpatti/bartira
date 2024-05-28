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

const FormFinanceiro = ({ pegarContas, aoEditarConta, setAoEditarConta }) => {
  const ref = useRef();

  useEffect(() => {
    if (aoEditarConta) {
      const conta = ref.current;
      conta.nome_conta.value = aoEditarConta.nome_conta;
      conta.preco_conta.value = aoEditarConta.preco_conta;
      conta.categoria_conta.value = aoEditarConta.categoria_conta;
      conta.status_conta.value = aoEditarConta.status_conta;
    }
  }, [aoEditarConta]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Formulário enviado!");

    const conta = ref.current;

    if (
      !conta.nome_conta.value ||
      !conta.preco_conta.value ||
      !conta.categoria_conta.value ||
      !conta.status_conta.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    if (aoEditarConta) {
      console.log("Editando conta:", conta);
      await axios
        .put(`http://localhost:8080/contas/${aoEditarConta.idConta}`, {
          nome_conta: conta.nome_conta.value,
          preco_conta: conta.preco_conta.value,
          categoria_conta: conta.categoria_conta.value,
          status_conta: conta.status_conta.value,
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
          preco_conta: conta.preco_conta.value,
          categoria_conta: conta.categoria_conta.value,
          status_conta: conta.status_conta.value,
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
    conta.preco_conta.value = "";
    conta.categoria_conta.value = "";
    conta.status_conta.value = "";
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
        <FormLabel>Preço</FormLabel>
        <Input name="preco_conta" type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Categoria</FormLabel>
        <Select name="categoria_conta">
          <option value="Pagar">Pagar</option>
          <option value="Receber">Receber</option>
        </Select>
      </FormControl>
      <FormControl mb="5">
        <FormLabel>Status</FormLabel>
        <Select name="status_conta">
          <option value="Concluida">Concluída</option>
          <option value="Pendente">Pendente</option>
        </Select>
      </FormControl>
      <Button type="submit" variant="ghost">
        Salvar
      </Button>
    </form>
  );
};

// Definindo PropTypes para validar as props
FormFinanceiro.propTypes = {
  pegarContas: PropTypes.func.isRequired,
  aoEditarConta: PropTypes.object,
  setAoEditarConta: PropTypes.func.isRequired,
};

export default FormFinanceiro;
