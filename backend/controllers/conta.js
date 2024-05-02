import { db } from "../db.js";

export const pegarContas = (_, res) => {
  const q = "SELECT * FROM contas";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const adicionarConta = (req, res) => {
  const q =
    "INSERT INTO contas (`nome`, `email`, `cargo`, `cpf`, `categoria`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.descricao,
    req.body.preco,
    req.body.quantidade,
    req.body.categoria,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Funcionário adicionado com sucesso!");
  });
};

export const atualizarConta = (req, res) => {
  const q =
    "UPDATE contas SET `nome` = ?, `descricao` = ?, `preco` = ?, `quantidade` = ?, `categoria` = ? WHERE `idConta` = ?";

  const values = [
    req.body.nome,
    req.body.descricao,
    req.body.preco,
    req.body.quantidade,
    req.body.categoria,
  ];

  db.query(q, [...values, req.params.idConta], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Conta atualizado com sucesso!");
  });
};

export const deletarConta = (req, res) => {
  const q = "DELETE FROM contas WHERE `idConta` = ?";

  db.query(q, [req.params.idConta], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Conta deletado com sucesso!");
  });
};
