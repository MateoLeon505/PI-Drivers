// Este componente es el HOME
//----------------------------------------------
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDrivers } from '../../redux/actions.js';
import Drivers from '../Components/Drivers/drivers.jsx';
import Pagination from '../Components/Pagination/pagination.jsx';
import { CLEAR_SEARCH_RESULTS } from '../../redux/action-types.js';
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
    const driversOnPage = 12;
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
    //---
    // X Origin
    const filterByOrigin = useSelector(state => state.filterOrigin);  // Drivers filtrados x Origen
    //---
    // X Orden Alfabético
    const sortedSelected = useSelector(state => state.sortedSelected); // Sorted seleccionado
    //---
    // X Orden de Nacimiento
    const orderAgeSelected = useSelector(state => state.orderAgeSelected);
    //-------------------
    // Filtrado combinado
    let filteredDrivers = filterByTeam.length > 0 ? filterByTeam : allDrivers;

    if (filterByOrigin.length > 0) 
    {
        filteredDrivers = filteredDrivers.filter((driverByTeam) => 
        filterByOrigin.some((driverByOrigin) => driverByOrigin.id === driverByTeam.id));
    }

    if (sortedSelected === 'asc')
    {
        filteredDrivers.sort((a, b) => a.forename.localeCompare(b.forename));
    }
    else if (sortedSelected === 'desc') 
    {
        filteredDrivers.sort((a, b) => b.forename.localeCompare(a.forename));
    }

    if (orderAgeSelected === 'young') 
    {    
        filteredDrivers.sort((a, b) => b.dob.split('-')[0].localeCompare(a.dob.split('-')[0]));
    }
    if (orderAgeSelected === 'old') 
    {    
        filteredDrivers.sort((a, b) => a.dob.split('-')[0].localeCompare(b.dob.split('-')[0]));
    }

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
    //---------------
    const handleBack = (event) =>
    {
        event.preventDefault();
        dispatch({type: CLEAR_SEARCH_RESULTS});
    }
    //------------------------------------------
    return(
        <div >
            {
                isLoading
                ? 
                    (
                        <div className = 'loading'>
                            <img src = {loading} alt = "Loading" className = 'imageLoading' />
                        </div>
                    )
                :
                    (
                        searchResults.length > 0
                        ?
                            (
                                <div>
                                    <button className = 'back-buttonSearch' onClick = {handleBack} >Back</button>
                                    <Drivers collectionOfDrivers = {searchResults} />
                                </div>
                            )
                        : 
                            (
                                filteredDrivers.length > 0 
                                ?
                                    (                            
                                        <div className = 'page-container'>
                                            <div>
                                                <h1 className = 'title-drivers'>DRIVERS</h1>
                                                <Drivers collectionOfDrivers = {filterCollection}/>
                                                {
                                                    filteredDrivers.length > driversOnPage && 
                                                        <Pagination totalOfPages = {driversFiltered} pagination = {changePage} ></Pagination> 
                                                }
                                            </div>

                                            <div className ='footer'>
                                                <span className = 'text-footer'>&copy; 2023 - Developed by Mateo León</span>
                                                <br />
                                                <span className = 'text-footer'>Drivers App</span>
                                                <br />
                                                <a className='icons-media' href="https://www.linkedin.com/in/mateo-le%C3%B3n-097b57268/">i</a>
                                                <a className='icons-media' href="https://github.com/MateoLeon505/">V</a>
                                            </div>
                                        </div>
                                    )
                                :
                                    (
                                        <div>
                                            <h1 className = 'title-drivers'>DRIVERS</h1>
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