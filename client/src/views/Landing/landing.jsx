// Este componente es el Landing Page
//----------------------------------------------
import './landing.css';
import  landingImage  from '../../Images/landingImage.jpg';
// import { useHistory } from 'react-router-dom';
//----------------------------------------------
const Landing = () =>
{
    // const history = useHistory();
    return(
        <div className = 'landingContainer'>
            <h1 className = 'title'>LANDING PAGE</h1>
            <div className = 'imageContainer'>
                <img src = {landingImage} alt = "LandingImage" className = 'f1Image'/>
            </div>
            <button className = 'buttonGo'>G</button>
        </div>
    );
}
//----------------------------------------------
export default Landing;