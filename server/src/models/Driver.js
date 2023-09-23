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
    id: 
    {
      type:DataTypes.UUID,  // Identificador único | Generado automáticamente
      defaultValue:DataTypes.UUIDV4, // Agrega un uuid aleatorio
      primaryKey: true, // Cada valor será unico | Nungún pokemon tendrá el mismo id
    },
    forename: 
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: 
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:
    {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: 
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: 
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob:
    {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },{timestamps:false});
};