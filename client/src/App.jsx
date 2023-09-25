// Este módulo es la raiz de la aplicación
//----------------------------------------------
// Importación de módulos
//import { useState } from 'react'
import { Switch, Route,  } from 'react-router-dom';
import { Landing } from './views/index.js';
import './App.css'
//----------------------------------------------
const  App = () => 
{
  //const location = useLocation(); // Ubicacíon
  //-------------
  return (
    <div>
      <Switch>
        <Route exact path = '/' component = {Landing}/>
      </Switch>
    </div>
  )
}
//----------------------------------------------
export default App;