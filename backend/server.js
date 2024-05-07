const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users");
const funcionariosRota = require("./routes/funcionarios");
const produtosRota = require("./routes/produtos");
// const vendasRota = require("./routes/vendas");
const contasRota = require("./routes/contas");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);

app.use("/", funcionariosRota);

app.use("/", produtosRota);

// app.use("/", vendasRota);

app.use("/", contasRota);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
