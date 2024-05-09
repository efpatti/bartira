const express = require("express");
const {
  pegarFuncionarios,
  adicionarFuncionario,
  atualizarFuncionario,
  deletarFuncionario,
  logarFuncionario,
  rotaProtegidaFuncionario,
} = require("../controllers/funcionario.js");

const router = express.Router();

// Rota para pegar todos os funcionários
router.get("/funcionarios", pegarFuncionarios);

// Rota para adicionar um novo funcionário
router.post("/funcionarios", adicionarFuncionario);

// Rota para fazer login
router.post("/loginFuncionario", logarFuncionario);

// Rota protegida que requer autenticação
router.get("/protegidoFuncionario", rotaProtegidaFuncionario);

// Rota para atualizar informações de um funcionário existente
router.put("/funcionarios/:idFuncionario", atualizarFuncionario);

// Rota para deletar um funcionário
router.delete("/funcionarios/:idFuncionario", deletarFuncionario);

module.exports = router;
