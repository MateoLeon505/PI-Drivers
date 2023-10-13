// Barra de Navegación
//----------------------------------------------
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/searchBar';
import { getTeams, filterByTeam, filterByOrigin, getDrivers, sort, filterByYear } from '../../../redux/actions';
import './navBar.css';
//----------------------------------------------
const NavBar = () =>
{
    const location = useLocation();
    const dispatch = useDispatch();
    //---------------
    const drivers = useSelector(state => state.drivers);
    const dob = drivers.map((driver) => driver.dob);
    const years = Array.from(new Set(dob.map(date => date.split('-')[0])));
    years.sort();
    //---------------
    const [ teamToFilter, setTeamToFilter ] = useState('all'); // Estado que va a guardar el Team seleccionado 
    const [ origin, setOrigin ] = useState('all'); // Estado que va a guardar el origen seleccionado
    const [ sorter, setSorter ] = useState('default'); // Estado que va a guardar el orden
    const [ yearToFilter, setYearToFilter ] = useState('all'); 
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
    const yearSelected = (event) => setYearToFilter(event.target.value);
    //---------------
    // Botón de Filtro
    const submitHandler = (event) =>
    {
        event.preventDefault();
        //-----
        if (teamToFilter || origin || sorter || yearToFilter) 
        {
            dispatch(filterByTeam(teamToFilter));
            dispatch(filterByOrigin(origin));
            dispatch(sort(sorter));
            dispatch(filterByYear(yearToFilter));
        }
        else if (teamToFilter) dispatch(filterByTeam(teamToFilter));
        else if (origin) dispatch(filterByOrigin(origin));
        else if (sorter) dispatch(sort(sorter));
        else dispatch(getDrivers());
    }

    const cleanFilters = (event) =>
    {
        event.preventDefault();
        //-----
        dispatch(filterByTeam('all'));
        dispatch(filterByOrigin('all'));
        dispatch(sort('default'));
        dispatch(filterByYear('all'));
        //-----
        setTeamToFilter('all');
        setOrigin('all');
        setSorter('default');
        setYearToFilter('all');
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
                        <div className = 'filter-byTeam'>Team</div>
                        <select onChange = {teamSelected} className = 'select-container'>
                            <option value = 'all' selected = {teamToFilter === 'all'}>All</option>
                            {
                                teams.map((team) => (
                                    <option value = {team.name} key = {team.name} selected = {teamToFilter === team.name}>{team.name}</option>
                                ))
                            }
                        </select>
                        <div className = 'filter-byOrigin'>Origin</div>
                        <select onChange = {originSelected} className = 'select-container2'>
                            <option value = "all" selected = {origin === 'all'}>All</option>
                            <option value = 'created' selected = {origin === 'created'}>Created</option>
                            <option value = 'fromapi' selected = {origin === 'fromapi'}>From Api</option>
                        </select>

                        <button onClick = {submitHandler} className = 'filter-button'><span className = 'filter-symbol'>g</span></button>

                        <div className = 'sort'>Sort</div>
                        <select onChange = {sortSelected} className = 'select-container3'>
                            <option value = 'default' selected = {sorter === 'default'}>Default</option>
                            <option value = 'asc' selected = {sorter === 'asc'}>Ascending</option>
                            <option value = 'desc' selected = {sorter === 'desc'}>Descending</option>
                        </select>

                        <div className = 'year'>Year</div>
                        <select onChange = {yearSelected} className = 'select-container4'>
                            <option value = "all" selected = {yearToFilter === 'all'}>All</option>
                            {
                                years.map((year) =>
                                (
                                    <option value = {year} selected = {yearToFilter === year}>{year}</option>
                                ))
                            }
                        </select>
                        <button onClick = {cleanFilters} className = 'clear-button'>C</button>
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