// Este componente es el Drivers: Smart que me muestra a los Drivers
//----------------------------------------------
import './driver.css';
//----------------------------------------------
const Driver = ({ id, forename, surname, description, image, nationality, dob, teams }) =>
{
    return(
        <div className = 'driverContainer'>
            <div className = 'card'>
                <div className = 'header'>
                    <span className = 'name'>{forename} {surname}</span>
                </div>
                <div className = 'imgContainer'>
                    <img src = {image} alt = {surname} className = 'imageDriver'/>
                </div>
                <div className = 'teams'>
                    <span>Teams: {teams}</span>
                </div>
            </div>
        </div>
    );
}
//----------------------------------------------
export default Driver;