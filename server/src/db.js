// Este módulo tiene la responsabilidad de crear la conexión con la bd
//-------------------------------------
require("dotenv").config(); // Carga de variables de entorno
//-------------------------------------
//Importación de módulos
const { Sequelize } = require("sequelize"); //para trabajar con bases de datos relacionales
const fs = require('fs'); // fs (para operaciones de archivo)
const path = require('path'); // path (para manipulación de rutas de archivo)
//-------------------------------------
const { DB_USER, DB_PASSWORD, DB_HOST,} = process.env;
//-------------------------------------
// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/drivers`, 
{
  logging: false, 
  native: false, 
});
//-------------------------------------
const basename = path.basename(__filename); // Obtención del nombre del archivo actual
//-------------------------------------
// Carga de definiciones de modelos:
const modelDefiners = [];
// Lee todos los archivos de la carpeta Models, los requiere y agrega al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));
//-------------------------------------
let entries = Object.entries(sequelize.models); // Capitalización de nombres de modelos
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);
//-------------------------------------
// En sequelize están todos los modelos
const { Driver, Team } = sequelize.models;
//-------------------------------------
// Relación muchos a muchos entre Driver y Team
Driver.belongsToMany(Team, { through: "driver_teams", as: 'teams' });
Team.belongsToMany(Driver, { through: "driver_teams", as: 'drivers' });
//-------------------------------------
module.exports =
{
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};