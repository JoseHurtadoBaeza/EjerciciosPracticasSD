// Dependencias necesarias
const express = require("express");
const mysql = require ("mysql");
const bodyParser = require("body-parser");

// Se define el puerto
const port = 3000;

// Se crea instancia de express
const appSD = express();

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Tenemos que usar el usuario que hayamos creado en mysql workbench
    password: '1234', // Tenemos que poner la contraseña que tengamos en nuestro usuario local
    database: 'SD_MYSQL'
});

// Comprobar conexión a la base de datos
connection.connect(error => {
    if (error) throw error;
    console.log('Conexión a la base de datos SD_MYSQL correcta');
});

// Rutas de la aplicación
// Página por defecto
appSD.get("/", (req, res) => {
    res.json({message:'Página de inicio de aplicación de ejemplo de SD'})
});

// Listado de todos los usuarios
appSD.get("/usuarios", (request, response) => {
    console.log('Listado de todos los usuarios');

    const sql = 'SELECT * FROM Usuarios';
    connection.query(sql, (error, resultado) => {
        if (error) throw error;
        if (resultado.length > 0){
            response.json(resultado);
        } else {
            response.send('No hay resultados');
        }
    });
});

// Ejecutar la aplicación / Arrancar el servidor
appSD.listen(port, () => {
    console.log(`Ejecutando la aplicación API REST de SD en el puerto ${port}`);
});