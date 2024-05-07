const express = require("express");
const { pegarVendas, registrarVenda } = require("../controllers/venda.js");

const router = express.Router();

router.get("/vendas", pegarVendas);

router.post("/vendas", registrarVenda);

module.exports = router;
