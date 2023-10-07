// Barra de Navegación
//----------------------------------------------
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/searchBar';
import { getTeams, filterByTeam, filterByOrigin, getDrivers } from '../../../redux/actions';
import './navBar.css';
//----------------------------------------------
const NavBar = () =>
{
    const location = useLocation();
    const dispatch = useDispatch();
    //---------------
    const [ teamToFilter, setTeamToFilter ] = useState('all'); // Estado que va a guardar el Team seleccionado 
    const [ origin, setOrigin ] = useState('all'); // Estado que va a guardar el origen seleccionado
    //---------------
    // useEffect(() =>
    // {
    //     dispatch(filterByTeam(teamToFilter));
    //     dispatch(filterByOrigin(origin));
    //     dispatch(getTeams());
    // },[teamToFilter, origin]);
    const teams = useSelector(state => state.teams);
    //---------------
    const teamSelected = (event) => setTeamToFilter(event.target.value); // Actualiza el estado con el team seleccionado
    const originSelected = (event) => setOrigin(event.target.value); // Actualiza el estado con el origen seleccionado
    //---------------
    // Botón de Filtro
    const submitHandler = (event) =>
    {
        event.preventDefault();
        //-----
        if (teamToFilter && origin) 
        {
            dispatch(filterByTeam(teamToFilter));
            dispatch(filterByOrigin(origin));
        }
        else if (teamToFilter) dispatch(filterByTeam(teamToFilter));
        else if (origin) dispatch(filterByOrigin(origin));
        else dispatch(getDrivers());
    }
    //---------------
    return(
        <div className = 'navBar-container'>
            <span className = 'name-app'>Race<span className = 'icon'> G</span>Hub</span>
            {location.pathname === '/home' && 
            (
                <>
                    <SearchBar/>
                    <form className = 'navBar-formContainer'>
                        <select onChange = {teamSelected} className = 'select-container'>
                            <option value = 'all'>All</option>
                            {
                                teams.map((team) => (
                                    <option value = {team.name}>{team.name}</option>
                                ))
                            }
                        </select>
                        <button onClick = {submitHandler} className = 'filter-button'><span className = 'filter-symbol'>g</span></button>
                        <select onChange = {originSelected} className = 'select-container2'>
                            <option value = "all" >All</option>
                            <option value = 'created'>Created</option>
                            <option value = 'fromapi'>From Api</option>
                        </select>
                    </form>
                </>
            )}
            <NavLink to = 'home' className = 'link'><span className = 'icons'>h</span></NavLink>
            <NavLink to = 'form' className = 'link'><span className = 'icons'>D</span></NavLink>
            <NavLink to = '/' className = 'link'><span className = 'icons'>o</span></NavLink>
        </div>
    );
}
//----------------------------------------------
export default NavBar;