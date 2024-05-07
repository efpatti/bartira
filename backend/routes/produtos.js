const {
  pegarProdutos,
  adicionarProduto,
  atualizarProduto,
  deletarProduto,
} = require("../controllers/produto.js");
const express = require("express");
const router = express.Router();

router.get("/produtos", pegarProdutos);

router.post("/produtos", adicionarProduto);

router.put("/produtos/:idProduto", atualizarProduto);

router.delete("/produtos/:idProduto", deletarProduto);

module.exports = router;
