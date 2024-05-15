const db = require("../db.js");

exports.pegarContas = (_, res) => {
  const q = "SELECT * FROM contas";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json(data);
  });
};

exports.adicionarConta = (req, res) => {
  const q =
    "INSERT INTO contas (`nome_conta`, `preco_conta`, `categoria_conta`, `status_conta`) VALUES(?)";

  const { nome_conta, preco_conta, categoria_conta, status_conta } = req.body;

  const values = [nome_conta, preco_conta, categoria_conta, status_conta];

  if (!nome_conta || !preco_conta || !categoria_conta || !status_conta) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  db.query(q, [values], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json("Conta adicionada com sucesso!");
  });
};

exports.atualizarConta = (req, res) => {
  const q =
    "UPDATE contas SET `nome_conta` = ?, `preco_conta` = ?, `categoria_conta` = ?, `status_conta` = ? WHERE `idConta` = ?";

  const { nome_conta, preco_conta, categoria_conta, status_conta } = req.body;

  const values = [nome_conta, preco_conta, categoria_conta, status_conta];

  if (!nome_conta || !preco_conta || !categoria_conta || !status_conta) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  db.query(q, [...values, req.params.idConta], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json("Conta atualizada com sucesso!");
  });
};

exports.deletarConta = (req, res) => {
  const q = "DELETE FROM contas WHERE `idConta` = ?";

  db.query(q, [req.params.idConta], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json("Conta deletada com sucesso!");
  });
};
