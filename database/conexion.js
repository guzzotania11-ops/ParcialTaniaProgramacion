const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

conexion.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Base de datos conectada");
});

module.exports = conexion;