// Este módulo tiene la responsabilidad de Traer a TODOS los Drivers
//-------------------------------------
// Importación de módulos
const { Driver, Team } = require('../db'); // Trae los modelos
const axios = require("axios"); // Para solicitudes HTTP
//-------------------------------------
const getAllDrivers = async () =>
{
    // Trae Divers de la bd
    const dataBaseDrivers = await Driver.findAll();
    //-------------------------------
    // Trae Drivers de la Api
    const apiDrivers = [];
    const apiData = (await axios.get('http://localhost:5000/drivers')).data;
    //---------
    apiDrivers.push(...apiData); 
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
                image: driver.image.url,
                nationality: driver.nationality,
                dob: driver.dob
            }
    }))
    //-------------------------------
    return  [...dataBaseDrivers, ...cleanDrivers]; // Retorna TODOS los drivers
}
//-------------------------------------
// Exporta la función
module.exports = { getAllDrivers };