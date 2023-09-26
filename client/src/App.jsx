// Este módulo es la raiz de la aplicación
//----------------------------------------------
// Importación de módulos
//import { useState } from 'react'
//import React, { useState } from 'react';
import {  useLocation, Routes, Route  } from 'react-router-dom';
import { Landing, Home, Form, Detail } from './views/index';
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
        <Route exact path = '/home' element = {<Home/>}/>
        <Route exact path = '/form' element = {<Form/>}/>
        <Route exact path = '/detail/:id' element = {<Detail/>}/>
      </Routes>
    </div>
  )
}
//----------------------------------------------
export default App;