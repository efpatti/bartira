const db = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.pegarFuncionarios = (_, res) => {
  const q = "SELECT * FROM funcionarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

exports.adicionarFuncionario = (req, res) => {
  const q =
    "INSERT INTO funcionarios (`nome_funcionario`, `email_funcionario`, `cargo_funcionario`, `cpf_funcionario`, `endereco_funcionario`, `senha_funcionario`) VALUES(?)";

  // Gera o hash da senha
  bcrypt.hash(req.body.senha_funcionario, 10, (err, hash) => {
    if (err) {
      console.error("Erro ao gerar hash da senha:", err);
      return res.status(500).json("Erro interno do servidor");
    }

    const values = [
      req.body.nome_funcionario,
      req.body.email_funcionario,
      req.body.cargo_funcionario,
      req.body.cpf_funcionario,
      req.body.endereco_funcionario,
      hash, // Salva o hash da senha no banco de dados
    ];

    db.query(q, [values], (err, result) => {
      if (err) {
        console.error("Erro ao inserir funcionário no banco de dados:", err);
        return res.status(500).json("Erro interno do servidor");
      }

      return res.status(200).json({
        message: "Funcionário adicionado com sucesso!",
      });
    });
  });
};

exports.atualizarFuncionario = (req, res) => {
  const q =
    "UPDATE funcionarios SET `nome_funcionario` = ?, `email_funcionario` = ?, `cargo_funcionario` = ?, `cpf_funcionario` = ?, `endereco_funcionario` = ?, `senha_funcionario` = ? WHERE `idFuncionario` = ?";

  const values = [
    req.body.nome_funcionario,
    req.body.email_funcionario,
    req.body.cargo_funcionario,
    req.body.cpf_funcionario,
    req.body.endereco_funcionario,
    req.body.senha_funcionario,
  ];

  db.query(q, [...values, req.params.idFuncionario], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Funcionário atualizado com sucesso!");
  });
};

exports.deletarFuncionario = (req, res) => {
  const q = "DELETE FROM funcionarios WHERE `idFuncionario` = ?";

  db.query(q, [req.params.idFuncionario], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Funcionário deletado com sucesso!");
  });
};

exports.logarFuncionario = (req, res) => {
  const { email_funcionario, senha_funcionario } = req.body;

  // Verificar se o usuário existe no banco de dados
  db.query(
    "SELECT * FROM funcionarios WHERE email_funcionario = ?",
    [email_funcionario],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Email ou senha inválidos" });
      }

      // Comparar a senha fornecida com a senha armazenada no banco de dados
      bcrypt.compare(
        senha_funcionario,
        results[0].senha_funcionario,
        (err, match) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          if (!match) {
            return res
              .status(401)
              .json({ message: "Email ou senha inválidos" });
          }

          // Gerar um token JWT
          const token = jwt.sign(
            { email_funcionario: results[0].email_funcionario },
            "jwt",
            {
              expiresIn: "1h",
            }
          );

          res.status(200).json({ token });
        }
      );
    }
  );
};

exports.rotaProtegida = (req, res) => {
  res.status(200).json({ message: "Seu token é válido" });
};
