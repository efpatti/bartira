import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
