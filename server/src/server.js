// Este módulo tiene la responsabilidad de crear el servidor
//----------------------------------------------
// Importación de módulos
const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
//----------------------------------------------
const server = express(); // Creación instancia del servidor
//----------------------------------------------
// Configuración middlewares
server.use(morgan("dev"));
server.use(express.json());
server.use(cors()); // Que venga cualquier cliente a comunicarse con el servidor
//-------------------------------------
server.use(router); // Manejo de rutas
//-------------------------------------
module.exports = server; // Exportación del servidor
