const db = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.pegarAdms = (_, res) => {
  const q = "SELECT * FROM administradores";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

exports.adicionarAdm = (req, res) => {
  const q =
    "INSERT INTO administradores (`nome_adm`, `email_adm`, `cargo_adm`, `cpf_adm`, `endereco_adm`, `senha_adm`) VALUES(?)";

  // Gera o hash da senha
  bcrypt.hash(req.body.senha_adm, 10, (err, hash) => {
    if (err) {
      console.error("Erro ao gerar hash da senha:", err);
      return res.status(500).json("Erro interno do servidor");
    }

    const values = [
      req.body.nome_adm,
      req.body.email_adm,
      req.body.cargo_adm,
      req.body.cpf_adm,
      req.body.endereco_adm,
      hash, // Salva o hash da senha no banco de dados
    ];

    db.query(q, [values], (err, result) => {
      if (err) {
        console.error("Erro ao inserir administrador no banco de dados:", err);
        return res.status(500).json("Erro interno do servidor");
      }

      return res.status(200).json({
        message: "Administrador adicionado com sucesso!",
      });
    });
  });
};

exports.atualizarAdm = (req, res) => {
  const q =
    "UPDATE administradores SET `nome_adm` = ?, `email_adm` = ?, `cargo_adm` = ?, `cpf_adm` = ?, `endereco_adm` = ?, `senha_adm` = ? WHERE `idAdm` = ?";

  const values = [
    req.body.nome_adm,
    req.body.email_adm,
    req.body.cargo_adm,
    req.body.cpf_adm,
    req.body.endereco_adm,
    req.body.senha_adm,
  ];

  db.query(q, [...values, req.params.idAdm], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Administrador atualizado com sucesso!");
  });
};

exports.deletarAdm = (req, res) => {
  const q = "DELETE FROM administradores WHERE `idAdm` = ?";

  db.query(q, [req.params.idAdm], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Administrador deletado com sucesso!");
  });
};

exports.logarAdm = (req, res) => {
  const { email_adm, senha_adm } = req.body;

  // Verificar se o usuário existe no banco de dados
  db.query(
    "SELECT * FROM administradores WHERE email_adm = ?",
    [email_adm],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Email ou senha inválidos" });
      }

      // Comparar a senha fornecida com a senha armazenada no banco de dados
      bcrypt.compare(senha_adm, results[0].senha_adm, (err, match) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (!match) {
          return res.status(401).json({ message: "Email ou senha inválidos" });
        }

        // Gerar um token JWT
        const token_adm = jwt.sign({ email_adm: results[0].email_adm }, "jwt", {
          expiresIn: "1h",
        });

        res.status(200).json({ token_adm });
      });
    }
  );
};

exports.rotaProtegidaAdm = (req, res) => {
  res.status(200).json({ message: "Seu token é válido" });
};
