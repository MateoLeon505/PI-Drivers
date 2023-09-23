// Este módulo tiene la responsabilidad de Traer a un Driver por ID
//-------------------------------------
// Importación de módulos
const { Driver, Team } = require('../db'); // Trae los modelos
const axios = require("axios"); // Para solicitudes HTTP
//-------------------------------------
const getDriverById = async (id, source) =>
{
    if (source === 'api') 
    {
        const apiDriverById = (await axios.get(`http://localhost:5000/drivers/${id}`)).data;
        const driver = 
        {
            id: apiDriverById.id,
            forename: apiDriverById.name.forename,
            surname: apiDriverById.name.surname,
            description: apiDriverById.description,
            image: apiDriverById.image.url,
            nationality: apiDriverById.nationality,
            dob: apiDriverById.dob
        }
        return driver;
    }
    else if (source === 'bd')
    {
        const dbDriverById = await Driver.findByPk(id);
        const driver = 
        {
            id: dbDriverById.id,
            forename: dbDriverById.forename,
            surname: dbDriverById.surname,
            description: dbDriverById.description,
            image: dbDriverById.image,
            nationality: dbDriverById.nationality,
            dob: dbDriverById.dob
        };
        return driver;   
    }
}
//-------------------------------------
// Exporta la función
module.exports = { getDriverById };