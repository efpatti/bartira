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

const FormProdutos = ({
  pegarProdutos,
  aoEditarProduto,
  setAoEditarProduto,
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
    if (aoEditarProduto) {
      const produto = ref.current;
      produto.nome_produto.value = aoEditarProduto.nome_produto;
      produto.descricao_produto.value = aoEditarProduto.descricao_produto;
      produto.preco_produto.value = aoEditarProduto.preco_produto;
      produto.quantidade_produto.value = aoEditarProduto.quantidade_produto;
      produto.categoria_produto.value = aoEditarProduto.categoria_produto;
    }
  }, [aoEditarProduto]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Formulário enviado!");

    const produto = ref.current;

    if (
      !produto.nome_produto.value ||
      !produto.descricao_produto.value ||
      !produto.preco_produto.value ||
      !produto.quantidade_produto.value ||
      !produto.categoria_produto.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    if (aoEditarProduto) {
      console.log("Editando produto:", produto);
      await axios
        .put(`http://localhost:8080/produtos/${aoEditarProduto.idProduto}`, {
          nome_produto: produto.nome_produto.value,
          descricao_produto: produto.descricao_produto.value,
          preco_produto: produto.preco_produto.value,
          quantidade_produto: produto.quantidade_produto.value,
          categoria_produto: produto.categoria_produto.value,
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
      console.log("Adicionando novo produto:", produto);
      await axios
        .post("http://localhost:8080/produtos/", {
          nome_produto: produto.nome_produto.value,
          descricao_produto: produto.descricao_produto.value,
          preco_produto: produto.preco_produto.value,
          quantidade_produto: produto.quantidade_produto.value,
          categoria_produto: produto.categoria_produto.value,
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
    produto.nome_produto.value = "";
    produto.descricao_produto.value = "";
    produto.preco_produto.value = "";
    produto.quantidade_produto.value = "";
    produto.categoria_produto.value = "";
    setAoEditarProduto(null);
    pegarProdutos();
  };

  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input name="nome_produto" />
      </FormControl>
      <FormControl>
        <FormLabel>Descrição</FormLabel>
        <Input name="descricao_produto" type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Preço</FormLabel>
        <Input name="preco_produto" type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Quantidade</FormLabel>
        <Input name="quantidade_produto" />
      </FormControl>
      <FormControl mb="5">
        <FormLabel>Categoria</FormLabel>
        <Select name="categoria_produto">
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
FormProdutos.propTypes = {
  pegarProdutos: PropTypes.func.isRequired,
  aoEditarProduto: PropTypes.object,
  setAoEditarProduto: PropTypes.func.isRequired,
};

export default FormProdutos;
