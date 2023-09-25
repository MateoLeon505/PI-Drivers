// Este módulo tiene la responsabilidad de Traer a TODOS los 'Teams'
//-------------------------------------
// Importación de módulos
const { Driver, Team } = require('../db'); // Trae los modelos
const axios = require("axios"); // Para solicitudes HTTP
//-------------------------------------
const getTeams = async () =>
{
    const cleanTeams = new Set(); // Para que los teams no se repitan
    // Trae Teams de la bd
    const dataBaseTeams = await Team.findAll();
    //-------------------------------
    if (dataBaseTeams.length === 0) // Si la bd está vacía
    {
        const apiDrivers = [];
        const apiData = (await axios.get('http://localhost:5000/drivers')).data; // Trae Drivers de la Api
        //---------
        apiDrivers.push(...apiData); // Guarda los Drivers de la Api
        //-------------------------------
        // Trae los 'Teams' de los Drivers
        const everyTeams = await Promise.all(
        apiDrivers.map(async (driver) =>
        {
            return {
                teams: driver.teams,
            }
        })); // --> Acá tengo: [{teams:","}, {teams:", ,"}...}]       
        //-------------------------------
        everyTeams.forEach((driver) => 
        {
            if (driver.teams)
            {
                // {teams:"reanult,ferrari"} --> [reanult],[ferrari]...
                const teamsArray = driver.teams.split(',').map((team) => team.trim()); // Divide y elimina espacios
                teamsArray.forEach((teamName) =>
                {
                    cleanTeams.add(teamName); // Agrega el team y no permite que se repita
                })
            }
        });
    }
    //-------------------------------
    // Se convierte en array y se crea un objeto por cada team
    const uniqueTeams = Array.from(cleanTeams).map((teamName, i) => (   
    {
        id: i + 1,
        name: teamName
    }));
    // Inserta registros en la bd
    await Team.bulkCreate(uniqueTeams);
    //-------------------------------
    return  dataBaseTeams; // Retorna TODOS los Teams
}
//-------------------------------------
// Exporta la función
module.exports = { getTeams };