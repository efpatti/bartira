import express from "express";
import {
  pegarProdutos,
  adicionarProduto,
  atualizarProduto,
  deletarProduto,
} from "../controllers/produto.js";

const router = express.Router();

router.get("/produtos", pegarProdutos);

router.post("/produtos", adicionarProduto);

router.put("/produtos:idProduto", atualizarProduto);

router.delete("/produtos:idProduto", deletarProduto);

export default router;
