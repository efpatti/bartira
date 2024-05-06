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
    "INSERT INTO contas (`nome_conta`, `preco_conta`, `categoria_conta`, `status_conta`) VALUES(?)";

  const values = [
    req.body.nome_conta,
    req.body.preco_conta,
    req.body.categoria_conta,
    req.body.status_conta,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Conta adicionada com sucesso!");
  });
};

export const atualizarConta = (req, res) => {
  const q =
    "UPDATE contas SET `nome_conta` = ?, `preco_conta` = ?, `categoria_conta` = ?, `status_conta` = ? WHERE `idConta` = ?";

  const values = [
    req.body.nome_conta,
    req.body.preco_conta,
    req.body.categoria_conta,
    req.body.status_conta,
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
    return res.status(200).json("Conta deletada com sucesso!");
  });
};
