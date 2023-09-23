// Este módulo tiene la responsabilidad de Traer a TODOS los 'Teams'
//-------------------------------------
// Importación de módulos
const { Driver, Team } = require('../db'); // Trae los modelos
const axios = require("axios"); // Para solicitudes HTTP
//-------------------------------------
const getTeams = async () =>
{
    // Trae Teams de la bd
    const dataBaseTeams = await Team.findAll();
    //-------------------------------
    // Trae Drivers de la Api
    const apiDrivers = [];
    const apiData = (await axios.get('http://localhost:5000/drivers')).data;
    //---------
    apiDrivers.push(...apiData); 
    //-------------------------------
    // Trae los 'Teams' de los Drivers
    const cleanDrivers = await Promise.all(
        apiDrivers.map(async (driver) =>
    {
            return {
                teams: driver.teams,
            }
    })); // --> Acá tengo: [{teams:","}, {teams:", ,"}...}]       {teams:"reanult,ferrari"} --> [reanult],[ferrari]
    //-------------------------------
    const cleanTeams = new Set(); // Para almacenar equipos únicos
    cleanDrivers.forEach((obj) => 
    {
        if (obj.teams)
        {
            const teamsArray = obj.teams.split(',').map((team) => team.trim()); // Divide y elimina espacios
            teamsArray.forEach((team) =>
            {
                cleanTeams.add(team); // Agrega cada team al conjunto
            })
        }
    });
    //-------------------------------
    return  [...cleanTeams]; // Retorna TODOS los Teams
}
//-------------------------------------
// Exporta la función
module.exports = { getTeams };