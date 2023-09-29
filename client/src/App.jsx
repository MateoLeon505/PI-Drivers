// Este módulo es la raiz de la aplicación
//----------------------------------------------
// Importación de módulos
//import { useState } from 'react'
//import React, { useState } from 'react';
import {  useLocation, Routes, Route  } from 'react-router-dom';
import { Landing, Home, Form, Detail } from './views/index';
import NavBar from './views/Components/NavBar/navBar';
import './App.css'
//----------------------------------------------
const  App = () => 
{
  const location = useLocation(); // Ubicacíon
  //-------------
  return (
    <div>
      {location.pathname !== '/' && <NavBar/> }
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