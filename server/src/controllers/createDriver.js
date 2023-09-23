// Este módulo tiene la responsabilidad de Traer a un Driver por ID
//-------------------------------------
// Importación de módulos
const { Driver, Team } = require('../db'); // Trae los modelos
const axios = require("axios"); // Para solicitudes HTTP
//-------------------------------------
const createDriver = async ( id, forename, surname, description, image, nationality, dob ) =>
{   
    const newDriver = await Driver.create({id, forename, surname, description, image, nationality, dob}) 
    return;   
}
//-------------------------------------
// Exporta la función
module.exports = { createDriver };