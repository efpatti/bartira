import { db } from "../db.js";

export const pegarProdutos = (_, res) => {
  const q = "SELECT * FROM produtos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const adicionarProduto = (req, res) => {
  const q =
    "INSERT INTO produtos (`nome`, `descricao`, `preco`, `quantidade`, `categoria`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.descricao,
    req.body.preco,
    req.body.quantidade,
    req.body.categoria,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Produto adicionado com sucesso!");
  });
};

export const atualizarProduto = (req, res) => {
  const q =
    "UPDATE produtos SET `nome` = ?, `descricao` = ?, `preco` = ?, `quantidade` = ?, `categoria` = ? WHERE `idProduto` = ?";

  const values = [
    req.body.nome,
    req.body.descricao,
    req.body.preco,
    req.body.quantidade,
    req.body.categoria,
  ];

  db.query(q, [...values, req.params.idProduto], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Produto atualizado com sucesso!");
  });
};

export const deletarProduto = (req, res) => {
  const q = "DELETE FROM funcionarios WHERE `idProduto` = ?";

  db.query(q, [req.params.idProduto], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Produto deletado com sucesso!");
  });
};
