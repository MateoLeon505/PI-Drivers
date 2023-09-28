// La responsabilidad de este módulo es especificar el cambio de estado en respuesta a las acciones
//----------------------------------------------
// Trae 'action-types'
import { GET_DRIVERS, GET_DRIVER_BY_NAME, CLEAR_SEARCH_RESULTS, GET_DRIVER_DETAIL, GET_TEAMS, POST_DRIVER } from './action-types';
//----------------------------------------------
// Define estado inicial
const initialState = // Estado Global
{
    drivers: [],
    searchResults: [],
    detail: [],
    posted: [],
    teams: []
};
//---------------------------------------------- 
// Creación del reducer
const reducer = (state = initialState, action) =>
{
    switch (action.type) 
    {
        // Trae TODOS los Drivers
        case GET_DRIVERS:
            return { 
                ...state, // Copia del estado actual
                drivers: action.payload // y modifica con nuevo valor
            };
        // Trae Driver por name
        case GET_DRIVER_BY_NAME:
            return { 
                ...state, 
                searchResults: action.payload 
            };
        // Limpiar búsqueda
        case CLEAR_SEARCH_RESULTS:
            return {
                ...state, 
                searchResults: []
            }
        // Trae detalles del Driver
        case GET_DRIVER_DETAIL:
            return {
                ...state, 
                detail: action.payload
            }
        // Trae los Teams
        case GET_TEAMS:
            return {
                ...state,
                teams: action.payload
            }
        case POST_DRIVER:
            return {
                ...state,
                posted: action.payload
            }
        
        default:
            return { ...state }; //Copia del estado
    }
};
//----------------------------------------------
export default reducer; // Se exporta el reducer
