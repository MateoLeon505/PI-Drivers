// Este componente es el Form
//----------------------------------------------
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTeams, postDriver } from '../../redux/actions';
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
        forename: "",
        surname: "",
        description: "",
        image: "",
        nationality: "",
        dob: "",
        teams: []
    });
    //-----------------
    // Para detectar errores en el formulario
    const [ errors, setErrors ] = useState(
        {
            forename: "",
            surname: "",
            description: "",
            image: "",
            nationality: "",
            dob: "",
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
        formValidation(form); // Valida si el formulario está completo
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
        formValidation(form);
    }
    //---------------------
    // Para saber si un Team está seleccionado o NO
    const teamSelected = (team) => 
    {
        return form.teams.includes(team);
    }
    //---------------------------------
    // Valida que el formulario esté completo
    const [ isFormValid, setIsFormValid ] = useState(false); 
    const formValidation = (form) =>
    {
        const isValid =
            form.forename !== "" &&
            form.surname !== "" &&
            form.description !== "" &&
            form.image !== "" &&
            form.nationality !== "" &&
            form.dob !== "" &&
            form.teams.length > 0;

        const withoutErrors =
            errors.forename === "" && 
            errors.surname === "" && 
            errors.image === "" &&
            errors.nationality === "" ;

        if (isValid && withoutErrors) setIsFormValid(true);
        console.log(`isValid:` + isValid);
        console.log(`withoutErrors:` + withoutErrors);
    }
    //---------------------------------
    // Valida la información y crea al driver
    const submitHandler = (event) =>
    {
        event.preventDefault(); // Para que no se recargue la página
        formValidation(form);
        if (isFormValid) 
        {
            dispatch(postDriver(form)); // Crea el drver
            alert('Driver created successfully'); // Aviso de que se creó correctamente
            // Limpia el formulario
            setForm({
                forename: "",
                surname: "",
                description: "",
                image: "",
                nationality: "",
                dob: "",
                teams: []
            });
            setIsFormValid(false);
        }
        else
        {
            alert('Missing Data'); // Formulario incompleto
        }
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
            <button onClick = {backHandler} className = 'back' >x</button>
            <form name = 'createDriver'>
                    {/* -------------------- TÍTULO -------------------- */}
                <div className = 'header'>
                    <h1 className = 'title-CreateDriver'>CREATE DRIVER</h1>
                </div>
                    {/* -------------------- Errors -------------------- */}
                <div className = 'errors-container'>
                    {
                        errors.image && 
                        <div className = 'error-box'>
                            <span className = 'global-message'>❗Invalid URL</span>
                        </div>
                    }
                    {
                        errors.forename || errors.surname || errors.nationality 
                        ? 
                            <div className = 'error-box'>
                                <span className = 'global-message'>❗No numbers allowed</span>
                            </div>
                        : null
                    }
                </div>
                    {/* -------------------- Name -------------------- */}
                <div className = 'box-container'>
                    <div className = 'box'>
                        <label className = 'properties'>Forename</label>
                        <input type = "text" onChange = {changeHandler} value = {form.forename} name = 'forename' className = {`${errors.forename ? 'input-errors' : 'text-input'}`} placeholder = 'Lewis' id = 'forename'/>
                        {errors.forename && <span className = 'errors-message'>{errors.forename}</span>}
                    </div>
                    <div className = 'box'>
                        <label className = 'properties'>Surname</label>
                        <input type = "text" onChange = {changeHandler} value = {form.surname} name = 'surname' className = {`${errors.surname ? 'input-errors' : 'text-input'}`} placeholder = 'Hamilton' id = 'surname'/>
                        {errors.surname && <span className = 'errors-message'>{errors.surname}</span>}
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
                    <input type = "text" onChange = {changeHandler} value = {form.image} name = 'image' className = {`${errors.image ? 'errors-descript' : 'descript'}`} placeholder = 'https://example.jpg' id = 'image'/>
                    {errors.image && <span className = 'errors-message2'>{errors.image}</span>}
                </div>
                {/* -------------------- Nacionalidad y Fecha de Nacimiento -------------------- */}
                <div className = 'box-container'>
                    <div className = 'box'>
                        <label className = 'properties'>Nationality</label>
                        <input type = "text" onChange = {changeHandler} value = {form.nationality} name = 'nationality'  className = {`${errors.nationality ? 'input-errors' : 'text-input'}`}  placeholder = 'British' id = 'nationality'/>
                        {errors.nationality && <span className = 'errors-message'>{errors.nationality}</span>}
                    </div>
                    <div className = 'box'>
                        <label className = 'properties'>DOB</label>
                        <input type = "date" onChange = {changeHandler} value = {form.dob} name = 'dob' className = 'text-input'  id = 'dob'/>
                    </div>
                </div>
                {/* -------------------- Teams -------------------- */}
                <div>
                    <label className = 'propertiesTeams'>Teams</label>
                    <div className = 'teams-container'>
                        {
                            teamOptions.map((team) =>
                            (
                                <div className = 'teams-checkbox' key = {team}>
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
                    <button className = 'create' onClick = {submitHandler}>
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}
//----------------------------------------------
export default Form;