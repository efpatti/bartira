const express = require("express");
const router = express.Router();
const {
  pegarFornecedores,
  adicionarFornecedor,
  atualizarFornecedor,
  deletarFornecedor,
} = require("../controllers/fornecedor.js");

// Rota para obter todos os fornecedores
router.get("/fornecedores", pegarFornecedores);

// Rota para adicionar um novo fornecedor
router.post("/fornecedores", adicionarFornecedor);

// Rota para atualizar informações de um fornecedor existente
router.put("/fornecedores/:idFornecedor", atualizarFornecedor);

// Rota para deletar um fornecedor
router.delete("/fornecedores/:idFornecedor", deletarFornecedor);

module.exports = router;
