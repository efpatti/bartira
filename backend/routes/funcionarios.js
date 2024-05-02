import express from "express";
import {
  pegarFuncionarios,
  adicionarFuncionario,
  atualizarFuncionario,
  deletarFuncionario,
} from "../controllers/funcionario.js";

const router = express.Router();

router.get("/funcionarios", pegarFuncionarios);

router.post("/funcionarios", adicionarFuncionario);

router.put("/funcionarios:idFuncionario", atualizarFuncionario);

router.delete("/funcionarios:idFuncionario", deletarFuncionario);

export default router;
