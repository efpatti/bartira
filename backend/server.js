const express = require("express");
const cors = require("cors");
const usuariosRota = require("./routes/usuarios");
const produtosRota = require("./routes/produtos");
// const vendasRota = require("./routes/vendas");
const contasRota = require("./routes/contas");
const fornecedoresRota = require("./routes/fornecedores");
const vendasRota = require("./routes/vendas");

const app = express();
const PORT = process.env.PORT || 8080; // Adicionando suporte a variáveis de ambiente para a porta

// Middleware para lidar com a política de mesma origem (CORS)
app.use(cors());

// Middleware para lidar com dados JSON
app.use(express.json());

// Rotas
app.use("/", usuariosRota); // Específico para as rotas de usuários
app.use("/", produtosRota); // Específico para as rotas de produtos
// app.use("/vendas", vendasRota); // Específico para as rotas de vendas
app.use("/", contasRota); // Específico para as rotas de contas
app.use("/", vendasRota); // Específico para as rotas de contas
app.use("/", fornecedoresRota); // Específico para as rotas de contas

// Lidar com rotas não encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Middleware para lidar com erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno do servidor" });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
