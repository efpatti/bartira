import express from "express";
import { pegarVendas, registrarVenda } from "../controllers/venda.js";

const router = express.Router();

router.get("/vendas", pegarVendas);

router.post("/vendas", registrarVenda);

export default router;
