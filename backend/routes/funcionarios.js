const [
  pegarFuncionarios,
  adicionarFuncionario,
  atualizarFuncionario,
  deletarFuncionario,
] = require("../controllers/funcionario.js");

const express = require("express");

const router = express.Router();

router.get("/funcionarios", pegarFuncionarios);

router.post("/funcionarios", adicionarFuncionario);

router.put("/funcionarios/:idFuncionario", atualizarFuncionario);

router.delete("/funcionarios/:idFuncionario", deletarFuncionario);

module.exports = router;
