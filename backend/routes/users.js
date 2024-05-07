const express = require("express");
const router = express.Router();
const controlerUsuario = require("../controllers/user");

router.post("/registre-se", controlerUsuario.registrarUsuario);

router.post("/login", controlerUsuario.logarUsuario);

router.get("/protegido", controlerUsuario.rotaProtegida);

module.exports = router;
