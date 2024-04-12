const mysql=require("mysql");
 require(dotenv);
  const dbconfig ={
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10
 }
 const pool = mysql.createPool(dbconfig);
 module.exports = pool;