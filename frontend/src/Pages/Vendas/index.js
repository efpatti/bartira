import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, List, ListItem, Input, Button } from "@chakra-ui/react";
import CarrinhoCompras from "./CarrinhoCompras";
import PropTypes from "prop-types";

const Vendas = ({ pegarVendas, registrarVenda }) => {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [dataVenda, setDataVenda] = useState("");
  const [quantidadeVenda, setQuantidadeVenda] = useState(1);

  useEffect(() => {
    async function fetchProdutos() {
      const response = await axios.get("http://localhost:8080/produtos");
      setProdutos(response.data);
    }
    fetchProdutos();
  }, []);

  const adicionarAoCarrinho = (produto) => {
    const quantidadeDisponivel = produto.quantidade_produto;
    if (quantidadeVenda > quantidadeDisponivel) {
      console.error(
        "Quantidade selecionada maior do que a disponível em estoque."
      );
      return;
    }

    // Atualizar a quantidade disponível do produto na lista de produtos
    const novosProdutos = produtos.map((p) => {
      if (p.idProduto === produto.idProduto) {
        return {
          ...p,
          quantidade_produto: p.quantidade_produto - quantidadeVenda,
        };
      }
      return p;
    });
    setProdutos(novosProdutos);

    const novoItem = { ...produto, quantidade: quantidadeVenda, dataVenda };
    setCarrinho([...carrinho, novoItem]);
  };

  const removerItemCarrinho = (index) => {
    const novoCarrinho = carrinho.filter((_, i) => i !== index);
    setCarrinho(novoCarrinho);
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Página de Vendas
      </Heading>
      <CarrinhoCompras
        carrinho={carrinho}
        removerItemCarrinho={removerItemCarrinho}
      />
      <Heading as="h2" mb={4}>
        Produtos Disponíveis
      </Heading>
      <List>
        {produtos.map((produto) => (
          <ListItem
            key={produto.idProduto}
            mb={2}
            display="flex"
            alignItems="center"
          >
            <Box flex="1">
              {produto.nome_produto} - R${produto.preco_produto} - Disponível:{" "}
              {produto.quantidade_produto}
            </Box>
            <Input
              type="date"
              value={dataVenda}
              onChange={(e) => setDataVenda(e.target.value)}
              w="200px"
              mr={2}
            />
            <Input
              type="number"
              min="1"
              max={produto.quantidade_produto}
              value={
                quantidadeVenda > produto.quantidade_produto
                  ? produto.quantidade_produto
                  : quantidadeVenda
              }
              onChange={(e) => setQuantidadeVenda(parseInt(e.target.value))}
              w="100px"
              mr={2}
            />
            <Button
              colorScheme="blue"
              size="sm"
              onClick={() => adicionarAoCarrinho(produto)}
            >
              Adicionar ao Carrinho
            </Button>
          </ListItem>
        ))}
      </List>
      <Button mt={4} colorScheme="green" onClick={registrarVenda}>
        Registrar Venda
      </Button>
    </Box>
  );
};

// Definindo PropTypes para validar as props
Vendas.propTypes = {
  pegarVendas: PropTypes.func.isRequired,
  registrarVenda: PropTypes.object,
};

export default Vendas;
