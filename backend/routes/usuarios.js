const express = require("express");
const jwt = require("jsonwebtoken");
const {
  pegarUsuarios,
  adicionarUsuario,
  atualizarUsuario,
  deletarUsuario,
  logarUsuario,
  rotaProtegida,
} = require("../controllers/usuario.js");

const router = express.Router();

// Rota para pegar todos os funcionários
router.get("/usuarios", pegarUsuarios);

// Rota para adicionar um novo funcionário
router.post("/usuarios", adicionarUsuario);

// Rota para fazer login
router.post("/loginUsuario", logarUsuario);

// Rota protegida que requer autenticação
router.get("/protegido", rotaProtegida);

// Rota para atualizar informações de um funcionário existente
router.put("/usuarios/:idUsuario", atualizarUsuario);

// Rota para deletar um funcionário
router.delete("/usuarios/:idUsuario", deletarUsuario);

module.exports = router;
