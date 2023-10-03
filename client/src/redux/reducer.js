// La responsabilidad de este módulo es especificar el cambio de estado en respuesta a las acciones
//----------------------------------------------
// Trae 'action-types'
import { GET_DRIVERS, GET_DRIVER_BY_NAME, CLEAR_SEARCH_RESULTS, 
         GET_DRIVER_DETAIL, GET_TEAMS, POST_DRIVER, FILTER_BY_TEAM } from './action-types';
//----------------------------------------------
// Define estado inicial (global)
const initialState = 
{
    drivers: [],
    searchResults: [],
    detail: [],
    posted: [],
    teams: [],
    filterTeam: [],
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
                drivers: action.payload // y modifica la propiedad con nuevo valor
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
        // Trae drivers por Team
        case FILTER_BY_TEAM:
            const filter = [];
            console.log('-------------------------');
            state.drivers.map((driver) => 
            {
                const teams = driver.teams.split(',').map((team) => team.trim()); // Divide y elimina espacios
                let match = teams.filter((team) => team === action.payload) // Guarda teams que concidan
                if (match.length > 0) filter.push(driver); // Guarda el driver que tenga algún team que coincida 
            })
            return{
                ...state,
                filterTeam: filter
            }
        default:
            return { ...state }; //Copia del estado
    }
};
//----------------------------------------------
export default reducer; // Se exporta el reducer