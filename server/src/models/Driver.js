// La responsabilidad de este módulo es configurar y definir la estructura del modelo
//--------------------------------------
// Importación de los tipos de datos necesarios
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => 
{
  // defino el modelo
  sequelize.define('Driver', 
  {
    id: {
      type:DataTypes.UUID,  
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true, 
    },
    forename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{timestamps:false});
}