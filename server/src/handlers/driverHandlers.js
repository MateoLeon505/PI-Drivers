// Handlers: Este módulo tiene la responsabilidad de manejar las solicitudes
//-------------------------------------
const { getAllDrivers } = require('../controllers/getAllDrivers');
const { getDriverByName } = require('../controllers/getDriverByName');
const { getDriverById } = require('../controllers/getDriverById');
const { getTeams } = require('../controllers/getTeams');
const { createDriver } = require('../controllers/createDriver');
//-------------------------------------
// GET | Traer: TODOS o por name
const getDriversHandler = async (req, res) =>
{
    const { name } = req.query;
    try 
    {
        const driver = name ? await getDriverByName(name) : await getAllDrivers(); 
        res.status(201).json(driver); 
    } 
    catch (error) 
    {
        res.status(404).send(`Error al buscar driver: ${error.message}`);    
    }
}
//-------------------------------------
// GET | Traer: driver por ID 
const getDriverByIdHandler = async (req, res) =>
{
    const { id } = req.params;
    const source = isNaN(id) ? "bd" : "api";
    try 
    {
        const driver = await getDriverById(id, source);
        res.status(201).json(driver);    
    } 
    catch (error) 
    {
        res.status(404).send(`Error al buscar driver por ID: ${error.message}`);  
    }
}
//-------------------------------------
// GET | Traer: teams
const getTeamsHandler = async (req, res) =>
{
    try 
    {
        const teams = await getTeams(); 
        res.status(201).json(teams); 
    } 
    catch (error) 
    {
        res.status(404).send(`Error al buscar Teams: ${error.message}`);    
    }
}
//-------------------------------------
// POST | Crear: Driver
const postDriversHandler = async (req, res) =>
{
    const { id, forename, surname, description, image, nationality, dob, teams } = req.body;
    try 
    {
        const newDriver = await createDriver( id, forename, surname, description, image, nationality, dob, teams ); 
        res.status(201).json(newDriver); 
    }  
    catch (error) 
    {
        res.status(404).send(`Error al Crear Driver: ${error.message}`);    
    }
}
//-------------------------------------
// Exportación de módulos
module.exports =
{
    getDriversHandler,
    getDriverByIdHandler,
    getTeamsHandler,
    postDriversHandler,
}