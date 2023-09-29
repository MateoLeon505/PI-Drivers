// NavBar: Barra de Navegación
//----------------------------------------------
import './searchBar.css';
import { NavLink } from 'react-router-dom';
//----------------------------------------------
const SearchBar = () =>
{
    return(
        <div className = 'searchBar-container'>
            <form>
                <input 
                type = "search" 
                className = 'input-driver'/>
                <button className = 'seeker'>Search</button>
            </form>
        </div>
    );
}
//----------------------------------------------
export default SearchBar;