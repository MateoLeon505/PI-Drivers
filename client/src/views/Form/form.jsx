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
    const changeHandler = (event) =>
    {
        const property = event.target.name; // Quién modificó
        const value = event.target.value; // Qué modificó

        setForm({...form, [property]: value })
    }
    //---------------------------------
    const handleSelect = (event) =>
    {
        const selectedTeam = event.target.value; // Team seleccionado

        if (form.teams.includes(selectedTeam)) 
        {
            setForm({...form, teams: teams.filter((teams) => teams !== selectedTeam)});    
        }
        else
        {
            setForm({...form, teams: [...form.teams, selectedTeam]});
        }
    }
    const handlerDeleteTeam = (event) =>
    {
        const selectedTeam = event.target.value; // Team seleccionado
        const updateTeams = form.teams.filter((team) => team !== selectedTeam)

        setForm({...form, teams: updateTeams})
    }
    //---------------------------------
    const backHandler = () =>
    {
        navigate('/home');
    }
    //---------------------------------
    return(
        <div className = 'FormContainer'>
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
                                <label key = {team}>
                                    <input
                                        type = 'checkbox'
                                        value = {team}
                                        chaecked = {form.teams.includes(team)}
                                        onChange = {handleSelect}>
                                        {team}
                                    </input>
                                </label>
                            ))
                        }
                    </div>
                    <select 
                        multiple 
                        onChange = {handleSelect}
                        value = {form.teams}
                        name = "teams" 
                    >
                        {
                            teamOptions.map((team) =>
                            (
                                <option key = {team} value = {team}>
                                    {team}     
                                    {form.teams.includes(team) && <span onClick = {handlerDeleteTeam}>❌</span>}
                                </option>
                            ))
                        }
                    </select>
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