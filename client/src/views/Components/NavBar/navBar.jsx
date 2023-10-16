// Barra de Navegación
//----------------------------------------------
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/searchBar';
import { getTeams, filterByTeam, filterByOrigin, getDrivers, sort, orderAge } from '../../../redux/actions';
import './navBar.css';
//----------------------------------------------
const NavBar = () =>
{
    const location = useLocation();
    const dispatch = useDispatch();
    //---------------
    const [ teamToFilter, setTeamToFilter ] = useState('all'); // Estado que va a guardar el Team seleccionado 
    const [ origin, setOrigin ] = useState('all'); // Estado que va a guardar el origen seleccionado
    const [ sorter, setSorter ] = useState('default'); // Estado que va a guardar el orden
    const [ sortByAge, setSortByAge ] = useState('default'); 
    //---------------
    const teams = useSelector(state => state.teams);
    useEffect(() =>
    {
        if (teams.length === 0) dispatch(getTeams());
    },[]);    
    //---------------
    const teamSelected = (event) => setTeamToFilter(event.target.value); // Actualiza el estado con el team seleccionado
    const originSelected = (event) => setOrigin(event.target.value); // Actualiza el estado con el origen seleccionado
    const sortSelected = (event) => setSorter(event.target.value); // Actualiza estado con orden selec
    const ageSelected = (event) => setSortByAge(event.target.value);
    //---------------
    // Botón de Filtro
    const submitHandler = (event) =>
    {
        event.preventDefault();
        //-----
        if (teamToFilter || origin || sorter || sortByAge) 
        {
            dispatch(filterByTeam(teamToFilter));
            dispatch(filterByOrigin(origin));
            dispatch(sort(sorter));
            dispatch(orderAge(sortByAge));
        }
        if (teamToFilter) dispatch(filterByTeam(teamToFilter));
        else if (origin) dispatch(filterByOrigin(origin));
        else if (sorter) dispatch(sort(sorter));
        else if (sortByAge) dispatch(orderAge(sortByAge));
        else dispatch(getDrivers());
    }

    const cleanFilters = (event) =>
    {
        event.preventDefault();
        //-----
        dispatch(filterByTeam('all'));
        dispatch(filterByOrigin('all'));
        dispatch(sort('default'));
        dispatch(orderAge('default'));
        //-----
        setTeamToFilter('all');
        setOrigin('all');
        setSorter('default');
        setSortByAge('default');
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
                        <div className = 'filter-cont'>
                            <span className = 'filter-byTeam'>Team</span>
                            <select onChange = {teamSelected} className = 'select-container'>
                                <option value = 'all' selected = {teamToFilter === 'all'}>All</option>
                                {
                                    teams.map((team) => (
                                        <option value = {team.name} key = {team.name} selected = {teamToFilter === team.name}>{team.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className = 'filter-cont'>
                            <span className = 'filter-byOrigin'>Origin</span>
                                <select onChange = {originSelected} className = 'select-container2'>
                                    <option value = "all" selected = {origin === 'all'}>All</option>
                                    <option value = 'created' selected = {origin === 'created'}>Created</option>
                                    <option value = 'fromapi' selected = {origin === 'fromapi'}>From Api</option>
                                </select>
                        </div>

                        <button onClick = {submitHandler} className = 'filter-button'><span className = 'filter-symbol'>g</span></button>

                        <div className = 'filter-cont'>
                            <span className = 'sort'>Sort</span>
                            <select onChange = {sortSelected} className = 'select-container3'>
                                <option value = 'default' selected = {sorter === 'default'}>Default</option>
                                <option value = 'asc' selected = {sorter === 'asc'}>Ascending</option>
                                <option value = 'desc' selected = {sorter === 'desc'}>Descending</option>
                            </select>
                        </div>

                        <div className = 'filter-cont'>
                            <span className = 'year'>Age</span>
                            <select onChange = {ageSelected} className = 'select-container4'>
                                <option value = "all" selected = {sortByAge === 'default'}>Default</option>
                                <option value = 'young' selected = {sortByAge === 'young'}>Youngest First</option>
                                <option value = 'old' selected = {sortByAge === 'old'}>Oldest First</option>
                            </select>
                        </div>

                        <button onClick = {cleanFilters} className = 'clear-button'>Clear</button>
                    </form>
                </>
            )}
            <div className = 'icons-container'>
            <NavLink to = 'home' className = 'link'><span className = {location.pathname === '/home' ? 'icons-selected' :'icons'}>h</span></NavLink>
            <NavLink to = 'form' className = 'link'><span className = {location.pathname === '/form' ? 'icons-selected' :'icons'}>D</span></NavLink>
            <NavLink to = '/' className = 'link'><span className = 'icons'>o</span></NavLink>
            </div>
        </div>
    );
}
//----------------------------------------------
export default NavBar;