// NavBar: Barra de Navegación
//----------------------------------------------
import './navBar.css';
import { NavLink, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/searchBar';
//----------------------------------------------
const NavBar = () =>
{
    const location = useLocation();

    return(
        <div className = 'navBar-container'>
            <h3 >DRIVERS APP</h3>
            {location.pathname === '/home' && <SearchBar></SearchBar>}
            <NavLink to = 'home'>Home</NavLink>
            <NavLink to = 'form'>Form</NavLink>
            <NavLink to = '/'>Out</NavLink>
        </div>
    );
}
//----------------------------------------------
export default NavBar;