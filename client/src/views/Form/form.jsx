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
    let teams = useSelector(state => state.teams); // Trae los Teams
    teams = teams.map((team) => team.name);
    //---------------------------------
    // Guarda la info del Formuario
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
    // Errores en el formulario
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
    // Busca los Teams
    useEffect(()=>
    {
        dispatch(getTeams);
    },[dispatch]);
    console.log(teams);
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