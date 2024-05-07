const express = require("express");
const {
  pegarAdms,
  adicionarAdm,
  atualizarAdm,
  deletarAdm,
  rotaProtegida,
  logarAdm,
} = require("../controllers/administrador.js");

const router = express.Router();

router.get("/adms", pegarAdms);

router.post("/adms", adicionarAdm);

router.post("/loginAdm", logarAdm);

router.get("/protegidoAdm", rotaProtegida);

router.put("/adms/:idAdm", atualizarAdm);

router.delete("/adms/:idAdm", deletarAdm);

module.exports = router;
