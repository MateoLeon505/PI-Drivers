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
    const dbDriverByName = await Driver.findOne(
        {
            where: 
            { 
                forename: 
                {
                    [Op.iLike]: `%${name}%` // Búsqueda insensible a May. o Min.
                }
            },
            limit: 15 // Limite 15 resultados
        });
    //-------------------------------
    // 
    if (dbDriverByName) // Si se encontró en la bd
    {
        const driver = 
        {
            id: dbDriverByName.id,
            forename: dbDriverByName.forename,
            surname: dbDriverByName.surname,
            description: dbDriverByName.description,
            image: dbDriverByName.image,
            nationality: dbDriverByName.nationality,
            dob: dbDriverByName.dob
        };
        return driver;  
    }
    else // Si no, busca en la Api
    {
        const apiDriverByName = (await axios.get(`http://localhost:5000/drivers?name.forename=${name}`)).data;
        if (apiDriverByName.length > 0) 
        {   
            return apiDriverByName.slice(0, 15).map((driver) =>
            ({
                id: apiDriverByName[0].id,
                forename: apiDriverByName[0].name.forename,
                surname: apiDriverByName[0].name.surname,
                description: apiDriverByName[0].description,
                image: apiDriverByName[0].image.url,
                nationality: apiDriverByName[0].nationality,
                dob: apiDriverByName[0].dob,
                teams: apiDriverByName[0].teams
            })); 
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