import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
//import { Provider } from 'react-redux';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <React.StrictMode> 
        <App />
      </React.StrictMode>
    </BrowserRouter>,
)
// <React.StrictMode>: Para encontrar y corregir problemas