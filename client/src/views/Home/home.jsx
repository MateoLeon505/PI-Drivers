// Este componente es el HOME
//----------------------------------------------
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDrivers } from '../../redux/actions.js';
import Drivers from '../Components/Drivers/drivers.jsx';
import Pagination from '../Components/Pagination/pagination.jsx';
import gifLoading from '../../Images/gifLoading.gif';
import './home.css';
//----------------------------------------------
const Home = () =>
{
    const dispatch = useDispatch(); // para despachar acciones
    //---------------
    const [ currentPage, setCurrentPage ] = useState(1); // Núm de página
    const allDrivers = useSelector(state => state.drivers); // Lista de TODOS los Drivers
    const driversOnPage = 9;
    const totalOfPages = allDrivers.length / driversOnPage; // Tot Drivers / Drivers x Pág
    //---------------
    // Paginación drivers 
    const collectionOfDrivers = allDrivers.slice(
        (currentPage - 1) * driversOnPage,
        currentPage * driversOnPage 
    );
    const changePage = (newPage) =>
    {
        setCurrentPage(newPage);
    }
    //---------------
    // Resultados de búsqueda
    const searchResults = useSelector(state => state.searchResults);
    //---------------
    // Trae Drivers cuando se monta el componente
    useEffect(() =>
    {
        dispatch(getDrivers());
    },[dispatch]);
    //------------------------------------------
    return(
        <div className = 'homeContainer'>
            {
                searchResults.length > 0
                ?
                    (
                        <div>
                            <Drivers collectionOfDrivers = {searchResults}/>
                        </div>
                    )
                : 
                    (
                        <div>
                            <h1 className = 'titles'>DRIVERS</h1>
                            <Drivers collectionOfDrivers = {collectionOfDrivers}/>
                            <Pagination totalOfPages = {totalOfPages} pagination = {changePage} ></Pagination>
                        </div>
                    )
            }
            <img src = {gifLoading} alt = "Loading" />
        </div>
    );
}
//----------------------------------------------
export default Home;