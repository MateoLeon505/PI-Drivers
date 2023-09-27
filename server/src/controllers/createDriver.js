// Este módulo tiene la responsabilidad de Traer a un Driver por ID
//-------------------------------------
// Importación de módulos
const { Driver, Team } = require('../db'); // Trae los modelos
//-------------------------------------
const createDriver = async ( id, forename, surname, description, image, nationality, dob, teams ) =>
{   
    // Crea nuevo Driver con las propiedades recibidas
    const newDriver = await Driver.create({ id, forename, surname, description, image, nationality, dob });
    //---------------------------- 
    // Busca Teams en la bd
    const bringTeams = await Team.findAll(
        {
            where: 
            {
                name: teams.map((team) => team)
            }
        }
    );
    const idTeams = bringTeams.map((team) => team.id);
    //---------------------------- 
    // Asociar los Teams al Driver recien creado
    await newDriver.setTeams(idTeams);
    //---------------------------- 
    return newDriver;   
}
//-------------------------------------
// Exporta la función
module.exports = { createDriver };