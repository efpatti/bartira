import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO usuarios (`nome`, `email`, `cargo`, `cpf`, `endereco`, `senha`) VALUES(?)";

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
    return res.status(200).json("Usuário adicionado com sucesso!");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE usuarios SET `nome` = ?, `email` = ?, `cargo` = ?, `cpf` = ?, `endereco` = ?, `senha` = ? WHERE `idCadastro` = ?";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.cargo,
    req.body.cpf,
    req.body.endereco,
    req.body.senha,
  ];

  db.query(q, [...values, req.params.idCadastro], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Usuário atualizado com sucesso!");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `idCadastro` = ?";

  db.query(q, [req.params.idCadastro], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Usuário deletado com sucesso!");
  });
};
