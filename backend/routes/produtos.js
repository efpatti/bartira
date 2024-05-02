import express from "express";
import {
  pegarProdutos,
  adicionarProduto,
  atualizarProduto,
  deletarProduto,
} from "../controllers/produto.js";

const router = express.Router();

router.get("/", pegarProdutos);

router.post("/", adicionarProduto);

router.put("/:idProduto", atualizarProduto);

router.delete("/:idProduto", deletarProduto);

export default router;
