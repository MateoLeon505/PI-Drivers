// Este componente es el HOME
//----------------------------------------------
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDrivers, getDriverById } from '../../redux/actions.js';
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
    //---------------
    // Trae Drivers cuando se monta el componente
    useEffect(() =>
    {
        dispatch(getDrivers());
    },[dispatch]);
    //---------------
    const allDrivers = useSelector(state => state.drivers); // Lista de TODOS los Drivers
    const totalOfPages = allDrivers.length / 9; // Tot Drivers / Drivers x Pág
    //------------------------------------------
    return(
        <div className = 'homeContainer'>
            <h1 className = 'titles'>DRIVERS</h1>
            <Drivers collectionOfDrivers = {allDrivers}/>
            <Pagination totalOfPages = {totalOfPages} ></Pagination>
            <img src = {gifLoading} alt = "Loading" />
        </div>
    );
}
//----------------------------------------------
export default Home;