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
    "INSERT INTO funcionarios (`nome_funcionario`, `email_funcionario`, `cargo_funcionario`, `cpf_funcionario`, `endereco_funcionario`, `senha_funcionario`) VALUES(?)";

  const values = [
    req.body.nome_funcionario,
    req.body.email_funcionario,
    req.body.cargo_funcionario,
    req.body.cpf_funcionario_funcionario,
    req.body.endereco_funcionario,
    req.body.senha_funcionario,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Funcionário adicionado com sucesso!");
  });
};

export const atualizarFuncionario = (req, res) => {
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

export const deletarFuncionario = (req, res) => {
  const q = "DELETE FROM funcionarios WHERE `idFuncionario` = ?";

  db.query(q, [req.params.idFuncionario], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Funcionário deletado com sucesso!");
  });
};
