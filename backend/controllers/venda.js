import { db } from "../db.js";

// Função para recuperar todas as vendas
export const pegarVendas = (_, res) => {
  const q = "SELECT * FROM vendas";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

// Função para registrar uma nova venda
export const registrarVenda = (req, res) => {
  const { idProduto, quantidadeVendida, dataVenda } = req.body;
  const qInsertVenda =
    "INSERT INTO vendas (idProduto, quantidadeVendida, dataVenda) VALUES (?, ?, ?)";
  const qUpdateProduto =
    "UPDATE produtos SET quantidade_produto = quantidade_produto - ? WHERE idProduto = ?";

  const valuesInsertVenda = [idProduto, quantidadeVendida, dataVenda];
  const valuesUpdateProduto = [quantidadeVendida, idProduto];

  db.beginTransaction((err) => {
    if (err) return res.json(err);

    db.query(qInsertVenda, valuesInsertVenda, (err, result) => {
      if (err) {
        db.rollback(() => res.json(err));
      } else {
        db.query(qUpdateProduto, valuesUpdateProduto, (err) => {
          if (err) {
            db.rollback(() => res.json(err));
          } else {
            db.commit((err) => {
              if (err) {
                db.rollback(() => res.json(err));
              } else {
                res.status(200).json("Venda registrada com sucesso!");
              }
            });
          }
        });
      }
    });
  });
};
