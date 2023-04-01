import mysql from "serverless-mysql";

const connection = mysql({
  config: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  },
});

export { connection };

/* const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((error) => {
  if (error) {
    console.error('Error conectando a la base de datos:', error);
    return;
  }
  console.log('Se conectó a la base de datos!');
});

module.exports = connection; */