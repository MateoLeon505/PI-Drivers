// Este componente es el HOME
//----------------------------------------------
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDrivers, getDriverById } from '../../redux/actions.js';
import Drivers from '../Components/Drivers/drivers.jsx';
import './home.css';
//----------------------------------------------
const Home = () =>
{
    const dispatch = useDispatch();

    const [ currentPage, setCurrentPage ] = useState(1); // Núm para páginas

    useEffect(() =>
    {
        dispatch(getDrivers());
    },[dispatch]);

    const allDrivers = useSelector(state => state.drivers); // Lista de TODOS los Drivers
    console.log(allDrivers);
    //------------------------------------------
    return(
        <div className = 'homeContainer'>
            <h1 className = 'titles'>DRIVERS</h1>
            <Drivers collectionOfDrivers = {allDrivers}/>
        </div>
    );
}
//----------------------------------------------
export default Home;