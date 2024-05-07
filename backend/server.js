const express = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const PORT = 8080;
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ilelo123",
  database: "bartira",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Conectado ao database!");
});

// Rota de registro de usuário
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Verificar se o usuário já existe
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        throw err;
      }

      if (results.length > 0) {
        return res
          .status(409)
          .json({ message: "Usuário já existe, tente outro nome de usuário" });
      }

      // Criptografar a senha antes de armazená-la no banco de dados
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          throw err;
        }

        // Salvar o usuário no banco de dados
        db.query(
          "INSERT INTO users (username, password) VALUES (?, ?)",
          [username, hash],
          (err) => {
            if (err) {
              throw err;
            }
            res.status(201).json({ message: "Usuário registrado com sucesso" });
          }
        );
      });
    }
  );
});

// Rota de login de usuário
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Verificar se o usuário existe no banco de dados
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        throw err;
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Usuário ou senha inválidos" });
      }

      // Comparar a senha fornecida com a senha armazenada no banco de dados
      bcrypt.compare(password, results[0].password, (err, match) => {
        if (err) {
          throw err;
        }

        if (!match) {
          return res
            .status(401)
            .json({ message: "Usuário ou senha inválidos" });
        }

        // Gerar um token JWT
        const token = jwt.sign({ username: results[0].username }, "jwt", {
          expiresIn: "1h",
        });
        console.log(token);

        res.status(200).json({ token });
      });
    }
  );
});

// Função de middleware para verificar o token
function verifyToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const [, token] = authorization.split(" ");

  jwt.verify(token, "jwt", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.username = decoded.username;
    next();
  });
}

// Rota protegida
app.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Seu token é inválido" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
