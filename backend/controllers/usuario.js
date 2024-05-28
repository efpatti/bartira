const db = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "sua_chave_secreta_aqui";

exports.pegarUsuarios = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json(data);
  });
};

exports.adicionarUsuario = (req, res) => {
  const {
    nome,
    email,
    cargo,
    cpf,
    cep,
    rua,
    numero,
    cidade,
    estado,
    pais,
    tipo,
    senha,
  } = req.body;

  const q =
    "INSERT INTO usuarios (`nome`, `email`, `cargo`, `cpf`, `cep`, `rua`, `numero`, `cidade`, `estado`, `pais`, `tipo`, `senha`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  // Validar entrada
  if (
    !nome ||
    !email ||
    !cargo ||
    !cpf ||
    !cep ||
    !rua ||
    !numero ||
    !cidade ||
    !estado ||
    !pais ||
    !tipo ||
    !senha
  ) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  // Gera o hash da senha
  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) {
      console.error("Erro ao gerar hash da senha:", err);
      return res.status(500).json("Erro interno do servidor");
    }

    const values = [
      nome,
      email,
      cargo,
      cpf,
      cep,
      rua,
      numero,
      cidade,
      estado,
      pais,
      tipo,
      hash,
    ];

    db.query(q, values, (err, result) => {
      if (err) {
        console.error("Erro ao inserir usuário no banco de dados:", err);
        return res.status(500).json("Erro interno do servidor");
      }

      return res.status(200).json({
        message: "Usuário adicionado com sucesso!",
      });
    });
  });
};

exports.atualizarUsuario = (req, res) => {
  const {
    nome,
    email,
    cargo,
    cpf,
    cep,
    rua,
    numero,
    cidade,
    estado,
    pais,
    tipo,
    senha,
  } = req.body;

  const q =
    "UPDATE usuarios SET `nome` = ?, `email` = ?, `cargo` = ?, `cpf` = ?, `cep` = ?, `rua` = ?, `numero` = ?, `cidade` = ?, `estado` = ?, `pais` = ?, `tipo` = ?, `senha` = ? WHERE `idUsuario` = ?";

  // Validar entrada
  // Validar entrada
  if (
    !nome ||
    !email ||
    !cargo ||
    !cpf ||
    !cep ||
    !rua ||
    !numero ||
    !cidade ||
    !estado ||
    !pais ||
    !tipo ||
    !senha
  ) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const values = [
    nome,
    email,
    cargo,
    cpf,
    cep,
    rua,
    numero,
    cidade,
    estado,
    pais,
    tipo,
    senha,
    req.params.idUsuario,
  ];

  db.query(q, values, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json("Usuário atualizado com sucesso!");
  });
};

exports.deletarUsuario = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `idUsuario` = ?";

  db.query(q, [req.params.idUsuario], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json("Usuário deletado com sucesso!");
  });
};

exports.logarUsuario = (req, res) => {
  const { email, senha } = req.body;

  // Verificar se o usuário existe no banco de dados
  db.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Email ou senha inválidos" });
      }

      // Comparar a senha fornecida com a senha armazenada no banco de dados
      bcrypt.compare(senha, results[0].senha, (err, match) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (!match) {
          return res.status(401).json({ message: "Email ou senha inválidos" });
        }

        // Verificar o tipo de usuário
        const tipo = results[0].tipo;

        let token;
        if (tipo === "Administrador") {
          // Gerar um token de administrador
          token = jwt.sign(
            {
              nome: results[0].nome,
              email: results[0].email,
              cargo: results[0].cargo,
              cpf: results[0].cpf,
              cep: results[0].cep,
              rua: results[0].rua,
              numero: results[0].numero,
              cidade: results[0].cidade,
              estado: results[0].estado,
              pais: results[0].pais,
              tipo: "Administrador",
            },
            jwtSecret,
            {
              expiresIn: "1h",
            },
            console.log("a", tipo)
          );
        } else if (tipo === "Funcionário") {
          // Gerar um token de funcionário
          token = jwt.sign(
            {
              nome: results[0].nome,
              email: results[0].email,
              cargo: results[0].cargo,
              cpf: results[0].cpf,
              cep: results[0].cep,
              rua: results[0].rua,
              numero: results[0].numero,
              cidade: results[0].cidade,
              estado: results[0].estado,
              pais: results[0].pais,
              tipo: "Funcionário",
            },
            jwtSecret,

            {
              expiresIn: "1h",
            },
            console.log("a", tipo)
          );
        } else if (tipo === "Cliente") {
          // Gerar um token de cliente
          token = jwt.sign(
            {
              nome: results[0].nome,
              email: results[0].email,
              cargo: results[0].cargo,
              cpf: results[0].cpf,
              cep: results[0].cep,
              rua: results[0].rua,
              numero: results[0].numero,
              cidade: results[0].cidade,
              estado: results[0].estado,
              pais: results[0].pais,
              tipo: "Cliente",
            },
            jwtSecret,

            {
              expiresIn: "1h",
            },
            console.log("a", tipo)
          );
        } else {
          return res.status(401).json({ message: "Tipo de usuário inválido" });
        }

        res.status(200).json({ token });
      });
    }
  );
};

exports.rotaProtegida = (req, res) => {
  res.status(200).json({ message: "Seu token é válido" });
};
