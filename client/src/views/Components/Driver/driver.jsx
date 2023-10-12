// Este componente es el Drivers: Smart que me muestra a los Drivers
//----------------------------------------------
import './driver.css';
//----------------------------------------------
const Driver = ({ id, forename, surname, description, image, nationality, dob, teams }) =>
{
    return(
        <div className = 'driverContainer'>
            <span className = 'name'>{forename} {surname}</span>
            <div className = 'card'>
                <div className = 'imageContainer'>
                    <img src = {image} alt = {surname} className = 'imageDriver'/>
                </div>
            </div>
            <div className = 'teams'>
                    <span>{teams}</span>
            </div>
        </div>
    );
}
//----------------------------------------------
export default Driver;