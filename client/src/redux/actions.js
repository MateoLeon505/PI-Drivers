// Este módulo representa las acciones que se toman en la aplicación
//----------------------------------------------
// Importación modulos y librerías
import axios from "axios";
import { GET_DRIVERS, GET_DRIVER_BY_NAME, CLEAR_SEARCH_RESULTS, GET_DRIVER_DETAIL, GET_TEAMS, POST_DRIVER } from './action-types';
//----------------------------------------------
// Actions:
const getDrivers = () =>
{
    return async function (dispatch)
    {
        const response = await axios.get('http://localhost:3001/drivers');
        dispatch({ type: GET_DRIVERS, payload: response.data });
    };
};
//-----------------
const getDriverByName = (name) =>
{
    return async function (dispatch)
    {
        const response = await axios.get(`http://localhost:3001/drivers?name=${name}`);
        dispatch({ type: GET_DRIVER_BY_NAME, payload: response.data });
    }
}
//-----------------
const getDriverById = (id) =>
{
    return async function (dispatch)
    {
        const response = await axios.get(`http://localhost:3001/drivers/${id}`);
        dispatch({ type: GET_DRIVER_DETAIL, payload: response.data });
    };
};
//-----------------
const getTeams = () =>
{
    return async function (dispatch)
    {
        const response = await axios.get(`http://localhost:3001/teams`);
        dispatch({ type: GET_TEAMS, payload: response.data });
    };
};
//-----------------
const postDriver = (form) =>
{
    return async function (dispatch)
    {
        const response = await axios.post('http://localhost:3001/drivers', form);
        dispatch({ type: POST_DRIVER, payload: response.data});
    }
}
//----------------------------------------------
// Exportación actions
export { getDrivers, getDriverByName, getDriverById, getTeams, postDriver };