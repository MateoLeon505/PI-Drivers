// Este componente es el HOME
//----------------------------------------------
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDrivers } from '../../redux/actions.js';
import Drivers from '../Components/Drivers/drivers.jsx';
import Pagination from '../Components/Pagination/pagination.jsx';
import loading from '../../Images/loading.gif'
import './home.css';
//----------------------------------------------
const Home = () =>
{
    const dispatch = useDispatch(); // para despachar acciones
    //---------------
    const [ isLoading, setIsLoading ] = useState(true);  // Carga de la página
    //---------------
    const [ currentPage, setCurrentPage ] = useState(1); // Núm de página
    const allDrivers = useSelector(state => state.drivers); // Lista de TODOS los Drivers
    const driversOnPage = 9;
    const totalOfPages = allDrivers.length / driversOnPage; // Tot Drivers / Drivers x Pág
    //---------------
    const searchResults = useSelector(state => state.searchResults); // Resultados de búsqueda
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
    // Trae Drivers cuando se monta el componente
    useEffect(() =>
    {
        dispatch(getDrivers())
        .finally(() => setIsLoading(false));
    },[dispatch]);
    //---------------
    //----------------------------------FILTROS------------------------------------------
    // X Team
    const filterByTeam = useSelector(state => state.filterTeam); // Drivers filtrados x Team
    const teamSelected = useSelector(state => state.teamSelected); // nombre del Team Seleccionado
    //---
    // X Origin
    const filterByOrigin = useSelector(state => state.filterOrigin);  // Drivers filtrados x Origen
    const originSelected = useSelector(state => state.originSelected); // origen Seleccionado
    //-------------------
    // Filtrado combinado
    const filteredDrivers = 
    (filterByTeam.length > 0 && filterByOrigin.length > 0)
    ?   // Ambos Filtros 
        filterByTeam.filter((driverByTeam) =>
            filterByOrigin.some((driverByOrigin) => driverByOrigin.id === driverByTeam.id)
        )
    : // Un solo filtro (Team)
    (filterByTeam.length > 0)
    ? filterByTeam
    : // Un solo filtro (Origin)
    (filterByOrigin.length > 0)
    && filterByOrigin

    const driversFiltered = Math.ceil(filteredDrivers.length / driversOnPage); // Drivers x pag  
    //-------------------
    // Grupo de drivers por página
    const filterCollection = Array.isArray(filteredDrivers) ? filteredDrivers.slice(
        (currentPage - 1) * driversOnPage,
        currentPage * driversOnPage
    ) : [];
    //---------------
    // Cuando cambia el filtro, vuelve a la página 1
    useEffect(() =>
    {
        setCurrentPage(1);
    },[filterByTeam, filterByOrigin]);
    //------------------------------------------
    return(
        <div>
            {
                isLoading
                ? <img src = {loading} alt = "Loading" />
                :
                    (
                        searchResults.length > 0
                        ?
                            (
                                <div>
                                    <Drivers collectionOfDrivers = {searchResults}/>
                                </div>
                            )
                        : 
                            (
                                filteredDrivers.length > 0 
                                ?
                                    (                            
                                        <div>
                                            <h1 className = 'title-drivers'>
                                                {teamSelected === 'all' && originSelected === 'all' 
                                                    ? 'All DRIVERS'
                                                    : `${teamSelected} ${originSelected}`
                                                }
                                            </h1>
                                            <Drivers collectionOfDrivers = {filterCollection}/>
                                            {
                                                filteredDrivers.length > driversOnPage && 
                                                    <Pagination totalOfPages = {driversFiltered} pagination = {changePage} ></Pagination> 
                                            }
                                            
                                        </div>
                                    )
                                :
                                    (
                                        <div>
                                            <h1 className = 'title-drivers'>All DRIVERS</h1>
                                            <Drivers collectionOfDrivers = {collectionOfDrivers}/>
                                            <Pagination totalOfPages = {totalOfPages} pagination = {changePage} ></Pagination>
                                        </div>
                                    )
                            )
                    )
            }
        </div>
    );
}
//----------------------------------------------
export default Home;