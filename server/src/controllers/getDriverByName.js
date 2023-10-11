// Este módulo tiene la responsabilidad de Traer a un Driver por nombre
//-------------------------------------
const { Driver, Team } = require('../db'); 
const axios = require("axios"); 
const { Op } = require('sequelize');
//-------------------------------------
const getDriverByName = async (name) =>
{
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(); // Insensible a may o min
    let combinedResults = [];
    //----------------------
    // BUSCA Divers en la bd
    let dbDriverByName = await Driver.findAll(
    {
        where: { 
            [Op.or]: [
                {forename: { [Op.iLike]: `%${name}%` }}, // Búsqueda insensible a May. o Min.
                {surname: { [Op.iLike]: `%${name}%` }},
            ],
        },
        include: [
            {
                model: Team,
                as: 'teams'
            }
        ]
    });
    dbDriverByName = dbDriverByName.map((driver) =>
    {
        let teams = driver.teams.map((team) => team.name);
        teams = teams.toString();
        return{
            id: driver.id,
            forename: driver.forename,
            surname: driver.surname,
            description: driver.description,
            image: driver.image|| "https://www.infobae.com/new-resizer/pSFNj731ixlR1smI8lNO00wpdis=/arc-anglerfish-arc2-prod-infobae/public/YOCWF4P2SVFE5GO2NLCVAAJZDU.jpg" ||"https://files.antena2.com/antena2/public/2021-09/000_app2002091461222_1_0.jpg?VersionId=2qQF31Nt4H6Q3.6vUjT1hd2c.zi0eFm2",
            nationality: driver.nationality,
            dob: driver.dob,
            teams: teams
        }
    })
    if (dbDriverByName.length > 0) combinedResults.push(...dbDriverByName);
    //-------------------------------
    // BUSCA Divers en la API
    let apiDriverByForeName = (await axios.get(`http://localhost:5000/drivers?name.forename=${name}`)).data;
    let apiDriverBysurName = (await axios.get(`http://localhost:5000/drivers?name.surname=${name}`)).data;

    if (apiDriverByForeName.length > 0) 
    {   
        apiDriverByForeName = apiDriverByForeName.map((driver) =>
        ({
            id: driver.id,
            forename: driver.name.forename,
            surname: driver.name.surname,
            description: driver.description,
            image: driver.image.url || "https://www.infobae.com/new-resizer/pSFNj731ixlR1smI8lNO00wpdis=/arc-anglerfish-arc2-prod-infobae/public/YOCWF4P2SVFE5GO2NLCVAAJZDU.jpg" ||"https://files.antena2.com/antena2/public/2021-09/000_app2002091461222_1_0.jpg?VersionId=2qQF31Nt4H6Q3.6vUjT1hd2c.zi0eFm2",
            nationality: driver.nationality,
            dob: driver.dob,
            teams: driver.teams
        })); 
        combinedResults.push(...apiDriverByForeName);
    }
    if (apiDriverBysurName.length > 0) 
    {   
        apiDriverBysurName = apiDriverBysurName.map((driver) =>
        ({
            id: driver.id,
            forename: driver.name.forename,
            surname: driver.name.surname,
            description: driver.description,
            image: driver.image.url || "https://www.infobae.com/new-resizer/pSFNj731ixlR1smI8lNO00wpdis=/arc-anglerfish-arc2-prod-infobae/public/YOCWF4P2SVFE5GO2NLCVAAJZDU.jpg" ||"https://files.antena2.com/antena2/public/2021-09/000_app2002091461222_1_0.jpg?VersionId=2qQF31Nt4H6Q3.6vUjT1hd2c.zi0eFm2",
            nationality: driver.nationality,
            dob: driver.dob,
            teams: driver.teams
        })); 
        combinedResults.push(...apiDriverBysurName);
    }
    //----------------------------------------------------------------
    if (combinedResults.length > 0) 
    {
        if (combinedResults.length > 15) return combinedResults.slice(0, 15);    
        else return combinedResults;    
    }
    else
    {
        return {message: 'No existe ningún driver con ese nombre'};
    }
}
//-------------------------------------
module.exports = { getDriverByName };