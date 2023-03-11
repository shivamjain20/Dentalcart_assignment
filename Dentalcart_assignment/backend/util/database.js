const mysql = require("mysql2");

const pool = mysql.createPool({
	host: "localhost",
	user: `${process.env.DB_USER}`,
	database: "students",
	password: `${process.env.DB_PWD}`,
});

module.exports = pool.promise();
