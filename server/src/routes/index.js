// Este módulo tiene la responsabilidad de definir las rutas
//----------------------------------------------
const { Router } = require("express");
const router = Router(); // Enrutador
//----------------------------------------------
// Importación Handlers
const 
{
    getDriversHandler,
    getDriverByIdHandler,
    getTeamsHandler,
    postDriversHandler
} = require('../handlers/driverHandlers');
//----------------------------------------------
// Definición de las rutas
router.get("/drivers", getDriversHandler); 
router.get("/drivers/:id", getDriverByIdHandler); 
router.get("/teams", getTeamsHandler); 
router.post("/drivers", postDriversHandler); 
//----------------------------------------------
module.exports = router; // Exportación del enrutador
