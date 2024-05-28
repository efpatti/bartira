const db = require("../db.js");
exports.pegarFornecedores = (_, res) => {
  const q = "SELECT * FROM fornecedores";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};
exports.adicionarFornecedor = (req, res) => {
  const q =
    "INSERT INTO fornecedores (`nome_fornecedor`, `cnpj_fornecedor`, `categoria_fornecedor`) VALUES(?)";

  const values = [
    req.body.nome_fornecedor,
    req.body.cnpj_fornecedor,
    req.body.categoria_fornecedor,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Fornecedor adicionado com sucesso!");
  });
};
exports.atualizarFornecedor = (req, res) => {
  const q =
    "UPDATE fornecedores SET `nome_fornecedor` = ?, `cnpj_fornecedor` = ?, `categoria_fornecedor` = ? WHERE `idFornecedor` = ?";

  const values = [
    req.body.nome_fornecedor,
    req.body.cnpj_fornecedor,
    req.body.categoria_fornecedor,
  ];

  db.query(q, [...values, req.params.idFornecedor], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Fornecedor atualizado com sucesso!");
  });
};
exports.deletarFornecedor = (req, res) => {
  const q = "DELETE FROM fornecedores WHERE `idFornecedor` = ?";

  db.query(q, [req.params.idFornecedor], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Fornecedor deletado com sucesso!");
  });
};
