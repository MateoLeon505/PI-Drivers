// La responsabilidad de este módulo es especificar el cambio de estado en respuesta a las acciones
//----------------------------------------------
// Trae 'action-types'
import { GET_DRIVERS, GET_DRIVER_BY_NAME, CLEAR_SEARCH_RESULTS, GET_DRIVER_DETAIL, 
    GET_TEAMS, POST_DRIVER, FILTER_BY_TEAM, FILTER_BY_ORIGIN, SORT, FILTER_BY_AGE } from './action-types';
//----------------------------------------------
// Define estado inicial (global)
const initialState = 
{
    drivers: [],
    searchResults: [],
    detail: [],
    teams: [],
    filterTeam: [],
    teamSelected: '',
    filterOrigin: [],
    originSelected: '',
    sortedSelected: '',
    orderByAge: [],
    orderAgeSelected: '',
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
        //----------------------
        // Trae Driver por name
        case GET_DRIVER_BY_NAME:
            return { 
                ...state, 
                searchResults: action.payload 
            };
        //----------------------
        // Limpiar búsqueda
        case CLEAR_SEARCH_RESULTS:
            return {
                ...state, 
                searchResults: []
            }
        //----------------------
        // Trae detalles del Driver
        case GET_DRIVER_DETAIL:
            return {
                ...state, 
                detail: action.payload
            }
        //----------------------
        // Trae los Teams
        case GET_TEAMS:
            return {
                ...state,
                teams: action.payload
            }
        //----------------------
        // Trae drivers por Team
        case FILTER_BY_TEAM:
            let filter = [];
            if (action.payload === 'all')  filter = state.drivers;    
            else 
            {
                state.drivers.map((driver) => 
                {
                    const teams = (driver.teams || '').split(',').map((team) => team.trim()); // Divide y elimina espacios
                    const match = teams.filter((team) => team === action.payload) // Guarda teams que concidan
                    if (match.length > 0) filter.push(driver); // Guarda el driver que tenga algún team que coincida 
                })
            }
            return{
                ...state,
                teamSelected: action.payload,
                filterTeam: filter
            }
        //----------------------
        // Filtro por origen
        case FILTER_BY_ORIGIN:
            let origin; 
            const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
            // Drivers de la bd
            if (action.payload === 'created') origin = state.drivers.filter((driver) => uuidRegex.test(driver.id)); 
            // Drivers de la Api
            else if (action.payload === 'fromapi') origin = state.drivers.filter((driver) => typeof driver.id === 'number' 
            && Number.isInteger(driver.id));
            // All drivers
            else origin = state.drivers;
            return{
                ...state,
                filterOrigin: origin,
                originSelected: action.payload
            }
        //----------------------
        // ORDEN Asc o Desc
        case SORT:
            return {
                ...state,
                sortedSelected: action.payload
            }
        //----------------------
        case FILTER_BY_AGE: 
        let orderByAge = [];

        if (action.payload === 'default') orderByAge = state.drivers;

        return {
            ...state,
            orderAgeSelected: action.payload
        }
        //----------------------
        // Por defecto
        default:
            return { ...state }; //Copia del estado
    }
};
//----------------------------------------------
export default reducer; // Se exporta el reducer