import express from "express";
import {
  pegarFuncionarios,
  adicionarFuncionario,
  atualizarFuncionario,
  deletarFuncionario,
} from "../controllers/funcionario.js";

const router = express.Router();

router.get("/", pegarFuncionarios);

router.post("/", adicionarFuncionario);

router.put("/:idCadastro", atualizarFuncionario);

router.delete("/:idCadastro", deletarFuncionario);

export default router;
