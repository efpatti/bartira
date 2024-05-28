const express = require("express");
const router = express.Router();
const {
  pegarVendas,
  adicionarVenda,
  atualizarVenda,
  deletarVenda,
} = require("../controllers/venda.js");

// Rota para obter todos as vendas
router.get("/vendas", pegarVendas);

// Rota para adicionar uma nova venda
router.post("/vendas", adicionarVenda);

// Rota para atualizar informações de uma venda existente
router.put("/vendas/:idVenda", atualizarVenda);

// Rota para deletar uma venda
router.delete("/vendas/:idVenda", deletarVenda);

module.exports = router;
