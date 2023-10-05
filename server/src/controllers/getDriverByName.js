// Este módulo tiene la responsabilidad de Traer a un Driver por nombre
//-------------------------------------
// Importación de módulos
const { Driver, Team } = require('../db'); // Trae los modelos
const axios = require("axios"); // Para solicitudes HTTP
const { Op } = require('sequelize');
//-------------------------------------
const getDriverByName = async (name) =>
{
    // 1ra letra mayúsc. y el resto minúsculas
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(); // Insensible a may o min
    // Trae Divers de la bd
    let dbDriverByName = await Driver.findAll(
    {
        where: { 
            [Op.or]: [
                {forename: { [Op.iLike]: `%${name}%` }}, // Búsqueda insensible a May. o Min.
                {surname: { [Op.iLike]: `%${name}%` }},
            ],
            
        },
        limit: 15, // Limite 15 resultados
    });
    //-------------------------------
    if (dbDriverByName.length >= 15) // Si se encontró en la bd
    {
        return dbDriverByName;  
    }

    if (dbDriverByName.length < 15) 
    {
        let apiDriverByName = (await axios.get(`http://localhost:5000/drivers?name.forename=${name}`)).data;
        if (apiDriverByName.length === 0) apiDriverByName = (await axios.get(`http://localhost:5000/drivers?name.surname=${name}`)).data;

        // Completar hasta 15 resultados si hay datos en la API
        const remainingResults = 15 - dbDriverByName.length;
        if (apiDriverByName.length > 0) 
        {   
            const apiResults = apiDriverByName.slice(0, remainingResults).map((driver) =>
            ({
                id: driver.id,
                forename: driver.name.forename,
                surname: driver.name.surname,
                description: apiDriverByName.description,
                image: driver.image.url,
                nationality: driver.nationality,
                dob: driver.dob,
                teams: driver.teams
            })); 
            return [...dbDriverByName, ...apiResults];
        }
        else
        {
            return {message: 'No existe ningún driver con ese nombre'};
        }
    }  
}
//-------------------------------------
// Exporta la función
module.exports = { getDriverByName };