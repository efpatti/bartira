const db = require("../db.js");
exports.pegarVendas = (_, res) => {
  const q = "SELECT * FROM vendas";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};
exports.adicionarVenda = (req, res) => {
  const q =
    "INSERT INTO vendas (`nome_produto_venda`, `quantidade_produto_venda`) VALUES(?, ?)";

  const nomeProdutoVenda = req.body.nome_produto_venda;
  const quantidadeProdutoVenda = req.body.quantidade_produto_venda;

  const values = [nomeProdutoVenda, quantidadeProdutoVenda];

  // Realiza a operação de venda dentro de uma transação
  db.beginTransaction((err) => {
    if (err) return res.json(err);

    // Verifica se há produtos suficientes disponíveis
    db.query(
      "SELECT quantidade_produto FROM produtos WHERE nome_produto = ?",
      [nomeProdutoVenda],
      (err, result) => {
        if (err) {
          db.rollback(() => {
            return res.json(err);
          });
        }

        const quantidadeDisponivel = result[0].quantidade_produto;
        if (quantidadeDisponivel < quantidadeProdutoVenda) {
          db.rollback(() => {
            return res
              .status(400)
              .json("Quantidade solicitada excede a quantidade disponível!");
          });
        }

        // Atualiza a quantidade de produtos na tabela produtos
        const updateProdutos =
          "UPDATE produtos SET `quantidade_produto` = ? WHERE `nome_produto` = ?";
        const novaQuantidade = quantidadeDisponivel - quantidadeProdutoVenda;
        db.query(updateProdutos, [novaQuantidade, nomeProdutoVenda], (err) => {
          if (err) {
            db.rollback(() => {
              return res.json(err);
            });
          }

          // Insere a venda na tabela vendas
          db.query(q, values, (err) => {
            if (err) {
              db.rollback(() => {
                return res.json(err);
              });
            }

            // Commit da transação
            db.commit((err) => {
              if (err) {
                db.rollback(() => {
                  return res.json(err);
                });
              }
              return res.status(200).json("Venda adicionada com sucesso!");
            });
          });
        });
      }
    );
  });
};

exports.atualizarVenda = (req, res) => {
  const q =
    "UPDATE vendas SET `nome_produto_venda` = ?, `quantidade_produto_venda` = ? WHERE `idVenda` = ?";

  const values = [
    req.body.nome_produto_venda,
    req.body.quantidade_produto_venda,
  ];

  db.query(q, [...values, req.params.idVenda], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Venda atualizada cam sucesso!");
  });
};
exports.deletarVenda = (req, res) => {
  const q = "DELETE FROM vendas WHERE `idVenda` = ?";

  db.query(q, [req.params.idVenda], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Venda deletada com sucesso!");
  });
};
