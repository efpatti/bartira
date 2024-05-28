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
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState(null);
  const [nomeProdutoSelecionado, setNomeProdutoSelecionado] = useState(null);
  const [statusSelecionado, setStatusSelecionado] = useState("");
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [quantidadeProdutoSelecionada, setQuantidadeProdutoSelecionada] =
    useState(0);

  useEffect(() => {
    const produtoSelecionado = produtos.find(
      (item) => item.nome_produto === nomeProdutoSelecionado
    );
    if (produtoSelecionado) {
      setQuantidadeDisponivel(produtoSelecionado.quantidade_produto);
      setQuantidadeProdutoSelecionada(produtoSelecionado.quantidade_produto);
    }
  }, [nomeProdutoSelecionado, produtos]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const venda = {
      nome_cliente_venda: clienteSelecionado,
      nome_produto_venda: nomeProdutoSelecionado,
      quantidade_produto_venda: quantidadeProdutoSelecionada,
      status_venda: statusSelecionado,
    };

    try {
      await axios.post("http://localhost:8080/vendas/", venda);
      toast.success("Venda adicionada com sucesso!");
      setNomeProdutoSelecionado("");
      setClienteSelecionado("");
      setQuantidadeProdutoSelecionada(0);
      setStatusSelecionado("");
      pegarVendas();
    } catch (error) {
      toast.error("Erro ao adicionar venda!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Nome do Cliente</FormLabel>
        <Select
          placeholder="Selecione o cliente"
          defaultValue={clienteSelecionado}
          name="nome_cliente_venda"
          onChange={(e) => setClienteSelecionado(e.target.value)}
        >
          {clientesReal.map((item) => (
            <option key={item.idUsuario} value={item.nome}>
              {item.nome}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Produto</FormLabel>
        <Select
          defaultValue={nomeProdutoSelecionado}
          placeholder="Selecione o produto"
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
      <FormControl mb="5">
        <FormLabel>Quantidade</FormLabel>
        <Input
          type="number"
          placeholder="Selecione a quantidade"
          defaultValue={quantidadeProdutoSelecionada}
          value={quantidadeProdutoSelecionada}
          onChange={(e) => setQuantidadeProdutoSelecionada(e.target.value)}
        />
      </FormControl>
      {quantidadeDisponivel > 0 && (
        <p>Quantidade disponível: {quantidadeDisponivel}</p>
      )}
      <FormControl mb="5">
        <FormLabel>Status</FormLabel>
        <Select
          name="status_venda"
          placeholder="Selecione o status"
          value={statusSelecionado}
          onChange={(e) => setStatusSelecionado(e.target.value)}
        >
          <option value="Solicitada">Solicitada</option>
          <option value="Aprovada">Aprovada</option>
        </Select>
      </FormControl>
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
