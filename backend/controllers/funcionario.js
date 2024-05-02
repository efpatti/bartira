import { db } from "../db.js";

export const pegarFuncionarios = (_, res) => {
  const q = "SELECT * FROM funcionarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const adicionarFuncionario = (req, res) => {
  const q =
    "INSERT INTO funcionarios (`nome`, `email`, `cargo`, `cpf`, `endereco`, `senha`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.cargo,
    req.body.cpf,
    req.body.endereco,
    req.body.senha,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Funcionário adicionado com sucesso!");
  });
};

export const atualizarFuncionario = (req, res) => {
  const q =
    "UPDATE funcionarios SET `nome` = ?, `email` = ?, `cargo` = ?, `cpf` = ?, `endereco` = ?, `senha` = ? WHERE `idFuncionario` = ?";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.cargo,
    req.body.cpf,
    req.body.endereco,
    req.body.senha,
  ];

  db.query(q, [...values, req.params.idFuncionario], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Funcionário atualizado com sucesso!");
  });
};

export const deletarFuncionario = (req, res) => {
  const q = "DELETE FROM funcionarios WHERE `idFuncionario` = ?";

  db.query(q, [req.params.idFuncionario], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Funcionário deletado com sucesso!");
  });
};
