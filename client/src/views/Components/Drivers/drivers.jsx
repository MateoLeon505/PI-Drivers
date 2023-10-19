// Este componente es el Drivers: Smart que me muestra a los Drivers
//----------------------------------------------
import { NavLink } from 'react-router-dom';
import Driver from '../Driver/driver.jsx';
import './drivers.css';
//----------------------------------------------
const Drivers = ({ collectionOfDrivers }) =>
{
    return(
            <div className = {collectionOfDrivers.length < 5 ? 'driverWrapper2' : 'driverWrapper'}>
                {
                    collectionOfDrivers.map((driver) =>
                    (
                        <NavLink key = {driver.id} to = {`/detail/${driver.id}`}>
                        <Driver
                            key = {driver.key}
                            id = {driver.id}
                            forename = {driver.forename}
                            surname = {driver.surname}
                            description = {driver.description}
                            image = {driver.image}
                            nationality = {driver.nationality}
                            dob = {driver.dob}
                            teams = {driver.teams}
                            className = 'Driver'/>
                        </NavLink>
                    ))
                }
            </div>
    );
}
//----------------------------------------------
export default Drivers;