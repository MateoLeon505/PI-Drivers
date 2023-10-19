// Barra de Búsqueda
//----------------------------------------------
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDriverByName, getDrivers } from '../../../redux/actions';
import { CLEAR_SEARCH_RESULTS } from '../../../redux/action-types';
import './searchBar.css';
//----------------------------------------------
const SearchBar = () =>
{
    const dispatch = useDispatch(); // Despacha acciones
    const [ name, setName ] = useState(''); // Estado que guarda el nombre
    //---------------
    // Actualiza el estado con el nombre escrito
    const changeHandler = (event) =>
    {
        setName(event.target.value); 
    }
    //---------------
    const searchDriver = (event) =>
    {
        event.preventDefault(); // No refresca la página
        //----
        if (name.trim() === '') 
        {
            dispatch({type: CLEAR_SEARCH_RESULTS});
            dispatch(getDrivers);
        }
        else
        {
            dispatch(getDriverByName(name));
        }
    }
    //---------------
    return(
        <div className = 'searchBar-container'>
            <form className = 'search-form'>
                <input 
                type = "search"
                value = {name}
                onChange = {changeHandler} 
                placeholder = 'Driver'
                className = 'input-driver'/>
                <button className = 'search' onClick = {searchDriver}><span className = 'lupa'>M</span></button>
            </form>
        </div>
    );
}
//----------------------------------------------
export default SearchBar;