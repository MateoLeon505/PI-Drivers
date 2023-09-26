// Este componente es el Drivers: Smart que me muestra a los Drivers
//----------------------------------------------
import { NavLink } from 'react-router-dom';
import Driver from '../Driver/driver.jsx';
import './drivers.css';
//----------------------------------------------
const Drivers = ({ collectionOfDrivers }) =>
{
    return(
        <>
            {collectionOfDrivers.map((driver) =>
            {
                <div key = {driver.key}>
                    <NavLink>
                        <Driver
                            id = {driver.id}
                            forename = {driver.forename}
                            surname = {driver.surname}
                            description = {driver.description}
                            image = {driver.image}
                            nationality = {driver.nationality}
                            dob = {driver.dob}
                            teams = {driver.teams}
                        >
                        </Driver>
                    </NavLink>
                </div>
            })}
        </>
    );
}
//----------------------------------------------
export default Drivers;