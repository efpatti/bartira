import React from "react";
import { Box, Heading, List, ListItem, Button } from "@chakra-ui/react";

const CarrinhoCompras = ({ carrinho, removerItemCarrinho }) => {
  return (
    <Box mb={8}>
      <Heading as="h2" mb={4}>
        Carrinho de Compras
      </Heading>
      {carrinho.length > 0 ? (
        <List>
          {carrinho.map((item, index) => (
            <ListItem key={index} mb={2} display="flex" alignItems="center">
              <Box flex="1">
                {item.nome_produto} - {item.quantidade}
              </Box>
              <Button size="sm" onClick={() => removerItemCarrinho(index)}>
                Remover
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>O carrinho está vazio.</p>
      )}
    </Box>
  );
};

export default CarrinhoCompras;
