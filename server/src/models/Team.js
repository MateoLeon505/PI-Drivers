// La responsabilidad de este módulo es configurar y definir la estructura del modelo
//--------------------------------------
// Importación de los tipos de datos necesarios
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => 
{
  // defino el modelo
  sequelize.define('Team', 
  {
    id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
   },{timestamps:false})
}