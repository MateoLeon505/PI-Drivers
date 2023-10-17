// Este módulo tiene la responsabilidad de crear un nuevo driver
//-------------------------------------
const { Driver, Team } = require('../db'); 
//-------------------------------------
const createDriver = async ( id, forename, surname, description, image, nationality, dob, teams ) =>
{   
    if (description.split(" ").length < 1) 
    {
        description = `This talented racing driver has showcased 
        their prowess on the track on numerous occasions. With an impressive 
        career in the world of motorsport, they have been a prominent figure 
        in various competitions and have won the hearts of fans with their 
        dedication and skills on the racetrack.`  
    }
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