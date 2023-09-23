// Este módulo tiene la responsabilidad de Traer a un Driver por nombre
//-------------------------------------
// Importación de módulos
const { Driver, Team } = require('../db'); // Trae los modelos
const axios = require("axios"); // Para solicitudes HTTP
//-------------------------------------
const getDriverByName = async (name) =>
{
    // Trae Divers de la bd
    const dbDriverByName = await Driver.findOne({where: { forename: name}});
    //-------------------------------
    // 
    if (dbDriverByName) 
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
    else
    {
        const apiDriverByName = (await axios.get(`http://localhost:5000/drivers?name.forename=${name}`)).data;
        const driver = 
        {
            id: apiDriverByName[0].id,
            forename: apiDriverByName[0].name.forename,
            surname: apiDriverByName[0].name.surname,
            description: apiDriverByName[0].description,
            image: apiDriverByName[0].image.url,
            nationality: apiDriverByName[0].nationality,
            dob: apiDriverByName[0].dob
        }
        return driver;
    }  
}
//-------------------------------------
// Exporta la función
module.exports = { getDriverByName };