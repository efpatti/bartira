import React, { useEffect, useState } from "react";
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

const Form = ({ clientes, produtos, pegarVendas }) => {
  const clientesReal = clientes.filter((cliente) => cliente.tipo === "Cliente");
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState(0);
  const [nomeProdutoSelecionado, setNomeProdutoSelecionado] = useState("");
  const [quantidadeProdutoSelecionada, setQuantidadeProdutoSelecionada] =
    useState("");

  useEffect(() => {
    const produtoSelecionado = produtos.find(
      (item) => item.nome_produto === nomeProdutoSelecionado
    );
    if (produtoSelecionado) {
      setQuantidadeDisponivel(produtoSelecionado.quantidade_produto);
    }
  }, [nomeProdutoSelecionado, produtos]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const venda = {
      nome_produto_venda: nomeProdutoSelecionado,
      quantidade_produto_venda: quantidadeProdutoSelecionada,
    };

    try {
      await axios.post("http://localhost:8080/vendas/", venda);
      toast.success("Venda adicionada com sucesso!");
      setNomeProdutoSelecionado("");
      setQuantidadeProdutoSelecionada("");
      pegarVendas();
    } catch (error) {
      toast.error("Erro ao adicionar venda!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Produto</FormLabel>
        <Select
          defaultValue={nomeProdutoSelecionado}
          value={nomeProdutoSelecionado}
          onChange={(e) => setNomeProdutoSelecionado(e.target.value)}
        >
          {produtos.map((item) => (
            <option key={item.idProduto} value={item.nome_produto}>
              {item.nome_produto}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Nome do Cliente</FormLabel>
        <Select defaultValue="" name="nome_cliente_venda">
          {clientesReal.map((item) => (
            <option key={item.idUsuario} value={item.nome_usuario}>
              {item.nome_usuario}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl mb="5">
        <FormLabel>Quantidade</FormLabel>
        <Input
          type="number"
          value={quantidadeProdutoSelecionada}
          onChange={(e) => setQuantidadeProdutoSelecionada(e.target.value)}
        />
      </FormControl>
      {quantidadeDisponivel > 0 && (
        <p>Quantidade disponível: {quantidadeDisponivel}</p>
      )}
      <Button type="submit" variant="ghost">
        Salvar
      </Button>
    </form>
  );
};

Form.propTypes = {
  pegarVendas: PropTypes.func.isRequired,
  produtos: PropTypes.array.isRequired,
};

export default Form;
