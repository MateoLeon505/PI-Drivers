// Este componente es el Drivers: Smart que me muestra a los Drivers
//----------------------------------------------
import './driver.css';
//----------------------------------------------
const Driver = ({ id, forename, surname, description, image, nationality, dob, teams }) =>
{
    return(
        <div className = 'driverContainer'>
            <span>Id: {id}</span>
            <span>Forename: {forename}</span>
            <span>Surname: {surname}</span>
            <span>Description: {description}</span>
            <img src = {image} alt = {image} />
            <span>Nationality: {nationality}</span>
            <span>DoB: {dob}</span>
            <span>Teams: {teams}</span>
        </div>
    );
}
//----------------------------------------------
export default Driver;