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

const Form = ({
  pegarFornecedores,
  aoEditarFornecedor,
  setAoEditarFornecedor,
}) => {
  const ref = useRef();

  const categorias = [
    {
      name: "Área de Serviço",
    },
    {
      name: "Cozinhas",
    },
    {
      name: "Quarto Infantil e Bebê",
    },
    {
      name: "Quartos",
    },
    {
      name: "Sala de Estar",
    },
    {
      name: "Sala de Jantar",
    },
  ];

  useEffect(() => {
    if (aoEditarFornecedor) {
      const fornecedor = ref.current;
      fornecedor.nome_fornecedor.value = aoEditarFornecedor.nome_fornecedor;
      fornecedor.cnpj_fornecedor.value = aoEditarFornecedor.cnpj_fornecedor;
      fornecedor.categoria_fornecedor.value =
        aoEditarFornecedor.categoria_fornecedor;
    }
  }, [aoEditarFornecedor]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Formulário enviado!");

    const fornecedor = ref.current;

    if (
      !fornecedor.nome_fornecedor.value ||
      !fornecedor.cnpj_fornecedor.value ||
      !fornecedor.categoria_fornecedor.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    if (aoEditarFornecedor) {
      console.log("Editando fornecedor:", fornecedor);
      await axios
        .put(
          `http://localhost:8080/fornecedores/${aoEditarFornecedor.idFornecedor}`,
          {
            nome_fornecedor: fornecedor.nome_fornecedor.value,
            cnpj_fornecedor: fornecedor.cnpj_fornecedor.value,
            categoria_fornecedor: fornecedor.categoria_fornecedor.value,
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
      console.log("Adicionando novo fornecedor:", fornecedor);
      await axios
        .post("http://localhost:8080/fornecedores/", {
          nome_fornecedor: fornecedor.nome_fornecedor.value,
          cnpj_fornecedor: fornecedor.cnpj_fornecedor.value,
          categoria_fornecedor: fornecedor.categoria_fornecedor.value,
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
    fornecedor.nome_fornecedor.value = "";
    fornecedor.cnpj_fornecedor.value = "";
    fornecedor.categoria_fornecedor.value = "";
    setAoEditarFornecedor(null);
    pegarFornecedores();
  };

  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input name="nome_fornecedor" />
      </FormControl>
      <FormControl>
        <FormLabel>CNPJ</FormLabel>
        <Input name="cnpj_fornecedor" type="text" />
      </FormControl>
      <FormControl mb="5">
        <FormLabel>Categoria</FormLabel>
        <Select name="categoria_fornecedor">
          {categorias.map((item, i) => (
            <option key={i} value={item.name}>
              {item.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="ghost">
        Salvar
      </Button>
    </form>
  );
};

// Definindo PropTypes para validar as props
Form.propTypes = {
  pegarFornecedores: PropTypes.func.isRequired,
  aoEditarFornecedor: PropTypes.object,
  setAoEditarFornecedor: PropTypes.func.isRequired,
};

export default Form;
