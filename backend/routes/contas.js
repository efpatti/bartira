const express = require("express");
const router = express.Router();
const {
  pegarContas,
  adicionarConta,
  atualizarConta,
  deletarConta,
} = require("../controllers/conta.js");

// Rota para obter todas as contas
router.get("/contas", pegarContas);

// Rota para adicionar uma nova conta
router.post("/conta", adicionarConta);

// Rota para atualizar informações de uma conta existente
router.put("/conta/:idConta", atualizarConta);

// Rota para deletar uma conta
router.delete("/conta/:idConta", deletarConta);

module.exports = router;
