const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ilelo123",
  database: "bartira",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Conectado ao database!");
});

module.exports = db;
