const express = require("express");
const router = express.Router();
const {
  pegarProdutos,
  adicionarProduto,
  atualizarProduto,
  deletarProduto,
} = require("../controllers/produto.js");

// Rota para obter todos os produtos
router.get("/produtos", pegarProdutos);

// Rota para adicionar um novo produto
router.post("/produtos", adicionarProduto);

// Rota para atualizar informações de um produto existente
router.put("/produtos/:idProduto", atualizarProduto);

// Rota para deletar um produto
router.delete("/produtos/:idProduto", deletarProduto);

module.exports = router;
