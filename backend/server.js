import express from "express";
import cors from "cors";
import funcionariosRota from "./routes/funcionarios.js";
import produtosRota from "./routes/produtos.js";
import contasRota from "./routes/contas.js";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/funcionarios", funcionariosRota);

app.use("/produtos", produtosRota);

app.use("/contas", contasRota);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
