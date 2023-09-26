// NavBar: Barra de Navegación
//----------------------------------------------
import './navBar.css';
import { NavLink } from 'react-router-dom';
//----------------------------------------------
const NavBar = () =>
{
    return(
        <div className = 'navBarContainer'>
            <h1 className = 'titles'>DRIVERS APP</h1>
            <NavLink to = 'home'>Home</NavLink>
            <NavLink to = 'form'>Form</NavLink>
            <NavLink to = '/'>Out</NavLink>
        </div>
    );
}
//----------------------------------------------
export default NavBar;