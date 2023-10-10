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
            dob: apiDriverById.dob,
            teams: apiDriverById.teams
        }
        return driver;
    }
    else if (source === 'bd')
    {
        // Busca driver por 'Primary Key' e incluye a los teams
        const dbDriverById = await Driver.findByPk(id, {include: [{ model: Team, as: 'teams' }]});
        let teams = dbDriverById.teams.map((team) => team.name); // Trae únicamente nombre de los 'teams'
        teams = teams.toString();

        const driver = 
        {
            id: dbDriverById.id,
            forename: dbDriverById.forename,
            surname: dbDriverById.surname,
            description: dbDriverById.description,
            image: dbDriverById.image,
            nationality: dbDriverById.nationality,
            dob: dbDriverById.dob,
            teams: teams
        };
        return driver;   
    }
}
//-------------------------------------
// Exporta la función
module.exports = { getDriverById };