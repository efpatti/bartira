const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = (req, res) => {
  const { username, password } = req.body;

  // Verificar se o usuário já existe
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length > 0) {
        return res
          .status(409)
          .json({ message: "Usuário já existe, tente outro nome de usuário" });
      }

      // Criptografar a senha antes de armazená-la no banco de dados
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        // Salvar o usuário no banco de dados
        db.query(
          "INSERT INTO users (username, password) VALUES (?, ?)",
          [username, hash],
          (err) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: "Usuário registrado com sucesso" });
          }
        );
      });
    }
  );
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  // Verificar se o usuário existe no banco de dados
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Usuário ou senha inválidos" });
      }

      // Comparar a senha fornecida com a senha armazenada no banco de dados
      bcrypt.compare(password, results[0].password, (err, match) => {
        if (err) {
          return res.status(500).json({ error: err.message });
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

        res.status(200).json({ token });
      });
    }
  );
};

exports.protectedRoute = (req, res) => {
  res.status(200).json({ message: "Seu token é válido" });
};
