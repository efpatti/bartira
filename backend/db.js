import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Desenvolvedor@123",
  database: "bartira",
});
