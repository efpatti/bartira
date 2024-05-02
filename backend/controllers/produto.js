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
    "INSERT INTO produtos (`nome_produto`, `descricao_produto`, `preco_produto`, `quantidade_produto`, `categoria_produto`) VALUES(?)";

  const values = [
    req.body.nome_produto,
    req.body.descricao_produto,
    req.body.preco_produto,
    req.body.quantidade_produto,
    req.body.categoria_produto,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Produto adicionado com sucesso!");
  });
};

export const atualizarProduto = (req, res) => {
  const q =
    "UPDATE produtos SET `nome_produto` = ?, `descricao_produto` = ?, `preco_produto` = ?, `quantidade_produto` = ?, `categoria_produto` = ? WHERE `idProduto` = ?";

  const values = [
    req.body.nome_produto,
    req.body.descricao_produto,
    req.body.preco_produto,
    req.body.quantidade_produto,
    req.body.categoria_produto,
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
