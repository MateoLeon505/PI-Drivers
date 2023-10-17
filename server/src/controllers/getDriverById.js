// Este módulo tiene la responsabilidad de Traer a un Driver por ID
//-------------------------------------
const { Driver, Team } = require('../db'); 
const axios = require("axios"); 
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
            description: apiDriverById.description || `This talented racing driver has showcased their prowess on the track on numerous occasions. With an impressive career in the world of motorsport, they have been a prominent figure in various competitions and have won the hearts of fans with their dedication and skills on the racetrack.`,
            image: apiDriverById.image.url|| "https://www.infobae.com/new-resizer/pSFNj731ixlR1smI8lNO00wpdis=/arc-anglerfish-arc2-prod-infobae/public/YOCWF4P2SVFE5GO2NLCVAAJZDU.jpg" ||"https://files.antena2.com/antena2/public/2021-09/000_app2002091461222_1_0.jpg?VersionId=2qQF31Nt4H6Q3.6vUjT1hd2c.zi0eFm2",
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
        let teams = dbDriverById.teams.map((team) => team.name); 
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
module.exports = { getDriverById };