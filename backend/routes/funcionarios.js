const express = require("express");
const {
  pegarFuncionarios,
  adicionarFuncionario,
  atualizarFuncionario,
  deletarFuncionario,
  logarFuncionario,
  rotaProtegida,
} = require("../controllers/funcionario.js");

const router = express.Router();

router.get("/funcionarios", pegarFuncionarios);

router.post("/funcionarios", adicionarFuncionario);

router.post("/funcionarios", adicionarFuncionario);

router.post("/login", logarFuncionario);

router.get("/protegido", rotaProtegida);

router.put("/funcionarios/:idFuncionario", atualizarFuncionario);

router.delete("/funcionarios/:idFuncionario", deletarFuncionario);

module.exports = router;
