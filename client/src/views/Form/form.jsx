// Este componente es el Form
//----------------------------------------------
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTeams } from '../../redux/actions';
import Validation from './validation';
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
        dispatch(getTeams());
    },[dispatch]);
    let teamOptions = useSelector(state => state.teams); // Trae los Team
    teamOptions = teamOptions.map((team) => team.name);
    teamOptions = teamOptions.sort();
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
    // Actualiza cambios en los input
    const changeHandler = (event) =>
    {
        const property = event.target.name; // Quién modificó
        const value = event.target.value; // Qué modificó

        setErrors(Validation({...form, [property]: value }));
        setForm({...form, [property]: value });
    }
    //---------------------------------
    // Actualizar teams seleccionados o deseleccionados
    const handleSelect = (event) => 
    {
        const selectedTeam = event.target.value; 

        if (form.teams.includes(selectedTeam)) 
        {
            setForm({...form, teams: form.teams.filter((teams) => teams !== selectedTeam)}); 
        }
        else
        {
            setForm({...form, teams: [...form.teams, selectedTeam]});
        }
    }
    //---------------------
    // Para saber si un Team está seleccionado o NO
    const teamSelected = (team) => 
    {
        return form.teams.includes(team);
    }
    //---------------------------------
    const backHandler = () =>
    {
        navigate('/home');
    }
    //---------------------------------
    return(
        <div className = 'formContainer'>
            {/* -------------------- Botón Salir -------------------- */}
            <button onClick = {backHandler} className = 'back' >X</button>
            <form name = 'createDriver'>
                    {/* -------------------- TÍTULO -------------------- */}
                <div className = 'header'>
                    <h1 className = 'titles'>CREATE DRIVER</h1>
                </div>
                    {/* -------------------- Errors -------------------- */}
                <div className = 'errors-container'>
                    {
                        errors.image && 
                        <div className = 'error-box'>
                            <span className = 'global-message'>⚠️*Invalid URL*</span>
                        </div>
                    }
                    {
                        errors.forename || errors.surname || errors.nationality 
                        ? 
                            <div className = 'error-box'>
                                <span className = 'global-message'>⚠️*No numbers allowed*</span>
                            </div>
                        : null
                    }
                </div>
                    {/* -------------------- Name -------------------- */}
                <div className = 'box-container'>
                    <div className = 'box'>
                        <label className = 'properties'>Forename</label>
                        <input type = "text" onChange = {changeHandler} value = {form.forename} name = 'forename' className = 'text-input' placeholder = 'Lewis' id = 'forename'/>
                    </div>
                    <div className = 'box'>
                        <label className = 'properties'>Surname</label>
                        <input type = "text" onChange = {changeHandler} value = {form.surname} name = 'surname' className = 'text-input' placeholder = 'Hamilton' id = 'surname'/>
                    </div>
                </div>
                {/* -------------------- Descripción -------------------- */}
                <div className = 'box2'>
                    <label className = 'properties'>Description</label>
                    <input type = "text" onChange = {changeHandler} value = {form.description} name = 'description' className = 'descript' id = 'description' placeholder = 'New Driver'/>
                </div>
                {/* -------------------- Imágen -------------------- */}
                <div className = 'box2'>
                    <label className = 'properties'>Image</label>
                    <input type = "text" onChange = {changeHandler} value = {form.image} name = 'image' className = 'descript' placeholder = 'https://example.jpg' id = 'image'/>
                </div>
                {/* -------------------- Nacionalidad y Fecha de Nacimiento -------------------- */}
                <div className = 'box-container'>
                    <div className = 'box'>
                        <label className = 'properties'>Nationality</label>
                        <input type = "text" onChange = {changeHandler} value = {form.nationality} name = 'nationality'  className = 'text-input'  placeholder = 'British' id = 'nationality'/>
                    </div>
                    <div className = 'box'>
                        <label className = 'properties'>DOB</label>
                        <input type = "date" onChange = {changeHandler} value = {form.dob} name = 'dob' className = 'text-input'  id='dob'/>
                    </div>
                </div>
                {/* -------------------- Teams -------------------- */}
                <div>
                    <label className = 'propertiesTeams'>Teams</label>
                    <div className = 'teams-container'>
                        {
                            teamOptions.map((team) =>
                            (
                                <div className = 'teams-checkbox'>
                                    <label className = 'tcLabel'>
                                        <input
                                         type = 'checkbox'
                                         value = {team}
                                         checked = {teamSelected(team)}
                                         onChange = {handleSelect}>
                                        </input>
                                        {team}
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <button className = 'create'>
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}
//----------------------------------------------
export default Form;