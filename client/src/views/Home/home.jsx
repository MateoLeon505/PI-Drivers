// Este componente es el HOME
//----------------------------------------------
import { useSelector } from 'react-redux';
import Drivers from '../Components/Drivers/drivers.jsx';
import './home.css';
//----------------------------------------------
const Home = () =>
{
    const allDrivers = useSelector((state) => state.drivers); // Lista de TODOS los Drivers
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