const {
  pegarContas,
  adicionarConta,
  atualizarConta,
  deletarConta,
} = require("../controllers/conta.js");

const express = require("express");

const router = express.Router();

router.get("/contas", pegarContas);

router.post("/contas", adicionarConta);

router.put("/contas/:idConta", atualizarConta);

router.delete("/contas/:idConta", deletarConta);

module.exports = router;
