const express = require("express");
const {
  pegarAdms,
  adicionarAdm,
  atualizarAdm,
  deletarAdm,
  logarAdm,
  rotaProtegidaAdm,
} = require("../controllers/administrador.js");

const router = express.Router();

// Rota para pegar todos os administradores
router.get("/administradores", pegarAdms);

// Rota para adicionar um novo administrador
router.post("/administradores", adicionarAdm);

// Rota para fazer login
router.post("/loginAdm", logarAdm);

// Rota protegida que requer autenticação
router.get("/protegidoAdm", rotaProtegidaAdm);

// Rota para atualizar informações de um administrador existente
router.put("/administradores/:idAdm", atualizarAdm);

// Rota para deletar um administrador
router.delete("/administradores/:idAdm", deletarAdm);

module.exports = router;
