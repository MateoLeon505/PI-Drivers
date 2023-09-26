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
    const handleChange = (event) =>
    {
        const property = event.target.name; // Quién modificó
        const value = event.target.value; // Qué modificó

        setForm({...form, [property]: value })
    }
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
                <div>
                    <h1 className = 'titles'>CREATE DRIVER</h1>
                </div>
                <div>
                    <label>Forename: </label>
                    <input type = "text" onChange = {handleChange} value = {form.forename} name = 'forename'/>
                    <label>Surname: </label>
                    <input type = "text" onChange = {handleChange} value = {form.surname} name = 'surname'/>
                </div>
                <div>
                    <label>Description: </label>
                    <input type = "text" onChange = {handleChange} value = {form.description} name = 'description'/>
                </div>
                <div>
                    <label>Image: </label>
                    <input type = "text" onChange = {handleChange} value = {form.image} name = 'description'/>
                </div>
                <div>
                    <label>Nationality: </label>
                    <input type = "text" onChange = {handleChange} value = {form.nationality} name = 'nationality'/>
                </div>
                <div>
                    <label>DOB: </label>
                    <input type = "date" onChange = {handleChange} value = {form.dob} name = 'dob'/>
                </div>
                <div>
                    <label>Teams: </label>
                    <div>
                        {
                            teamOptions.map((team) =>
                            (
                                    <div>
                                        <label>
                                            <input type = "checkbox" 
                                            value = {team}
                                            />
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