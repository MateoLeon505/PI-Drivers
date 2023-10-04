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
    useEffect(() =>
    {
        dispatch(filterByTeam(teamToFilter));
        dispatch(filterByOrigin(origin));
        dispatch(getTeams());
    },[teamToFilter, origin]);
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
            <h3 >DRIVERS APP</h3>
            {location.pathname === '/home' && 
            (
                <>
                    <SearchBar/>
                    <form>
                        <select onChange = {teamSelected}>
                            <option value = 'all'>All</option>
                            {
                                teams.map((team) => (
                                    <option value = {team.name}>{team.name}</option>
                                ))
                            }
                        </select>
                        <select onChange = {originSelected}>
                            <option value = "all" >All</option>
                            <option value = 'created'>Created</option>
                            <option value = 'fromapi'>From Api</option>
                        </select>
                        <button onClick = {submitHandler}>Filter</button>
                    </form>
                </>
            )}


            <NavLink to = 'home'>Home</NavLink>
            <NavLink to = 'form'>Form</NavLink>
            <NavLink to = '/'>Out</NavLink>
        </div>
    );
}
//----------------------------------------------
export default NavBar;