// Este módulo es la raiz de la aplicación
//----------------------------------------------
// Importación de módulos
//import { useState } from 'react'
//import React, { useState } from 'react';
import {  useLocation, Routes, Route  } from 'react-router-dom';
import { Landing } from './views/index';
import './App.css'
//----------------------------------------------
const  App = () => 
{
  const location = useLocation(); // Ubicacíon
  //-------------
  console.log(location.pathname);
  return (
    <div>
      <Routes>
        <Route exact path = '/' element = {<Landing/>}/>
      </Routes>
    </div>
  )
}
//----------------------------------------------
export default App;