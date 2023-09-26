// La responsabilidad de este componente es mantener el estado global y administrar todo el proceso 
// de cambio de estado y notificación a los componentes
//----------------------------------------------
// Importación de librerias y módulos
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';
//----------------------------------------------
// El compose:       si tiene la extensión = REDUX DEVTOOLS,     sino = compose
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
// Creación store
const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))
);
//----------------------------------------------
export default store;// Exporta la función