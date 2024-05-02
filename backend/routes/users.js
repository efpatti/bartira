import express from "express";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);

router.post("/", addUser);

router.put("/:idCadastro", updateUser);

router.delete("/:idCadastro", deleteUser);

export default router;
