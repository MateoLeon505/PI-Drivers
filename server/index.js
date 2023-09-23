// Este módulo tiene la responsabilidad de iniciar la aplicación
//--------------------------------------
const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
//--------------------------------------
// Sincronizando todos las modelos a la vez
conn.sync({ alter: true }).then(() => 
{
server.listen(PORT, () => 
{
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
