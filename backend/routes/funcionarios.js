const express = require("express");
const {
  pegarFuncionarios,
  adicionarFuncionario,
  atualizarFuncionario,
  deletarFuncionario,
  logarFuncionario,
} = require("../controllers/funcionario.js");

const router = express.Router();

router.get("/funcionarios", pegarFuncionarios);

router.post("/funcionarios", adicionarFuncionario);

router.post("/funcionarios", adicionarFuncionario);

router.post("/login", logarFuncionario);

router.put("/funcionarios/:idFuncionario", atualizarFuncionario);

router.delete("/funcionarios/:idFuncionario", deletarFuncionario);

module.exports = router;
