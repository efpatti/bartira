import express from "express";
import {
  pegarContas,
  adicionarConta,
  atualizarConta,
  deletarConta,
} from "../controllers/conta.js";

const router = express.Router();

router.get("/contas", pegarContas);

router.post("/contas", adicionarConta);

router.put("/contas:idConta", atualizarConta);

router.delete("/contas:idConta", deletarConta);

export default router;
