// Este módulo tiene la responsabilidad de Traer a TODOS los Drivers
//-------------------------------------
// Importación de módulos
const { Driver, Team } = require('../db'); // Trae los modelos
const axios = require("axios"); // Para solicitudes HTTP
//-------------------------------------
const getAllDrivers = async () =>
{
    // Trae Divers de la bd 
    let dataBaseDrivers = await Driver.findAll(
    {
        // Incluye name y excluye otras columnas de la tabla intermedia
        include: [{ model: Team, as: 'teams', attributes: ['name'], through: { attributes: [] }, }], 
    });
    const dbDrivers = dataBaseDrivers.map((driver) =>
    {
        let teams = driver.teams.map((team) => team.name);
        teams = teams.toString();
        return{
            id: driver.id,
            forename: driver.forename,
            surname: driver.surname,
            description: driver.description,
            image: driver.image,
            nationality: driver.nationality,
            dob: driver.dob,
            teams: teams
        }
    }) 
    //-------------------------------
    // Trae Drivers de la Api
    const apiDrivers = [];
    const apiData = (await axios.get('http://localhost:5000/drivers')).data;
    //---------
    apiData.map((driv) =>
    {
        apiDrivers.push(driv); 
    })    
    //-------------------------------
    // Trae las propiedades de los Drivers ✔
    const cleanDrivers = await Promise.all(
        apiDrivers.map(async (driver) =>
    {
            return {
                id: driver.id,
                forename: driver.name.forename,
                surname: driver.name.surname,
                description: driver.description,
                image: driver.image.url || "https://www.infobae.com/new-resizer/pSFNj731ixlR1smI8lNO00wpdis=/arc-anglerfish-arc2-prod-infobae/public/YOCWF4P2SVFE5GO2NLCVAAJZDU.jpg" ||"https://files.antena2.com/antena2/public/2021-09/000_app2002091461222_1_0.jpg?VersionId=2qQF31Nt4H6Q3.6vUjT1hd2c.zi0eFm2",
                nationality: driver.nationality,
                dob: driver.dob,
                teams: driver.teams
            }
    }))
    //-------------------------------
    return  [...dbDrivers, ...cleanDrivers]; // Retorna TODOS los drivers
}
//-------------------------------------
// Exporta la función
module.exports = { getAllDrivers };