// Este módulo tiene la responsabilidad de Traer a TODOS los 'Teams'
//-------------------------------------
const { Team } = require('../db'); 
const axios = require("axios"); 
//-------------------------------------
const getTeams = async () =>
{
    const cleanTeams = new Set(); // Para que los teams no se repitan
    // Trae Teams de la bd
    const dataBaseTeams = await Team.findAll();
    //-------------------------------
    if (dataBaseTeams.length === 0) 
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
        // |-> Array de objetos, donde cada objeto tiene una propiedad 'teams' que es un string de 1 o más teams
        //-------------------------------
        // Necesito separar los teams y verificar que no estén repetidos para guardarlos
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
    return dataBaseTeams; 
}
//-------------------------------------
module.exports = { getTeams };