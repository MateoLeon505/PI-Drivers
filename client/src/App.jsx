// Este módulo es la raiz de la aplicación
//----------------------------------------------
// Importación de módulos
//import { useState } from 'react'
//import React from 'react';
//import {  Switch,   } from 'react-router-dom';
import {  useLocation, Switch, Route  } from 'react-router-dom';
import { Landing } from './views/index';
import './App.css'
//----------------------------------------------
const  App = () => 
{
  const location = useLocation(); // Ubicacíon
//   const Landing = () =>
// {
//   return(
//     <div >
//       <h1>Holi</h1>
//     </div>
//   );
// }
  //-------------
  console.log(location.pathname);
  return (
    <div>
      <span>Holi</span>
      <Switch>
        <Route pathname = '/'/>
      </Switch>
      <p>{location.pathname}</p>
      <Landing></Landing>
    </div>
  )
}
//----------------------------------------------
export default App;
//          <Route path = '/home' component = {Landing}/>