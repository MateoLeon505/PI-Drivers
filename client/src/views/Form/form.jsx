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
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
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

        setErrors({...form, [property]: value });
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
    //---------------------------------
    const backHandler = () =>
    {
        navigate('/home');
    }
    //---------------------------------
    return(
        <div className = 'formContainer'>
            <button onClick = {backHandler} >Back</button>
            <form name = 'createDriver'>
                <div>
                    <h1 className = 'titles'>CREATE DRIVER</h1>
                </div>
                <div>
                    <label>Forename: </label>
                    <input type = "text" onChange = {changeHandler} value = {form.forename} name = 'forename' id='forename'/>
                    <label>Surname: </label>
                    <input type = "text" onChange = {changeHandler} value = {form.surname} name = 'surname' id='surname'/>
                </div>
                <div>
                    <label>Description: </label>
                    <input type = "text" onChange = {changeHandler} value = {form.description} name = 'description' id='description'/>
                </div>
                <div>
                    <label>Image: </label>
                    <input type = "text" onChange = {changeHandler} value = {form.image} name = 'image' id='image'/>
                </div>
                <div>
                    <label>Nationality: </label>
                    <input type = "text" onChange = {changeHandler} value = {form.nationality} name = 'nationality' id='nationality'/>
                </div>
                <div>
                    <label>DOB: </label>
                    <input type = "date" onChange = {changeHandler} value = {form.dob} name = 'dob' id='dob'/>
                </div>
                <div>
                    <label>Teams: </label>
                    <div>
                        {
                            teamOptions.map((team) =>
                            (
                                <div>
                                    <label>
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
                    <button>
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}
//----------------------------------------------
export default Form;