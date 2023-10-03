// Barra de Navegación
//----------------------------------------------
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/searchBar';
import { getTeams, filterByTeam } from '../../../redux/actions';
import './navBar.css';
//----------------------------------------------
const NavBar = () =>
{
    const location = useLocation();
    const dispatch = useDispatch();
    //---------------
    const [ teamToFilter, setTeamToFilter ] = useState(''); // Estado que va a guardar el Team seleccionado 
    //---------------
    useEffect(() =>
    {
        dispatch(getTeams());
    },[]);
    const teams = useSelector(state => state.teams);
    //---------------
    const teamSelected = (event) => setTeamToFilter(event.target.value);
    //---------------
    const submitHandler = (event) =>
    {
        event.preventDefault();
        //-----
        if (teamToFilter) dispatch(filterByTeam(teamToFilter));   
        else dispatch(filterByTeam([]));
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
                            {
                                teams.map((team) => (
                                    <option value = {team.name}>{team.name}</option>
                                ))
                            }
                        </select>
                        <select>
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
            {console.log(teams)}
        </div>
    );
}
//----------------------------------------------
export default NavBar;