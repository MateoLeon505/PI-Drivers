// Este componente es el Form
//----------------------------------------------
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTeams } from '../../redux/actions';
import './form.css';
//----------------------------------------------
const Form = () =>
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //---------------------------------
    // Busca los Teams
    useEffect(() =>
    {
        dispatch(getTeams);
    },[dispatch]);
    let teams = useSelector(state => state.teams); // Trae los Teams
    teams = teams.map((team) => team.name);
    console.log(teams);
    //---------------------------------
    // Para recibir la info del Formuario
    const [ form, setForm ] = useState(
    {
        id: "",
        forename: "",
        surname: "",
        description: "",
        image: "",
        nationality: "",
        teams: []
    });
    //-----------------
    // Para detectar errores en el formulario
    const [ errors, setErrors ] = useState(
        {
            id: "",
            forename: "",
            surname: "",
            description: "",
            image: "",
            nationality: "",
            teams: []
        });
    //---------------------------------
    const handleBack = () =>
    {
        navigate('/home');
    }
    //---------------------------------
    return(
        <div className = 'FormContainer'>
            <button onClick = {handleBack} >Back</button>
            <form>
                <h1 className = 'titles'>CREATE DRIVER</h1>
            </form>
        </div>
    );
}
//----------------------------------------------
export default Form;