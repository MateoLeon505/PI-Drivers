// Este componente es el Landing Page
//----------------------------------------------
import './landing.css';
import  landingImage  from '../../Images/landingImage.jpg';
import { useNavigate } from 'react-router-dom';
//----------------------------------------------
const Landing = () =>
{
    const navigate = useNavigate();
    const handleToHome = () =>
    {
        navigate('/home');
    }

    return(
        <div className = 'landingContainer'>
            <h1 className = 'titles'>RACEHUB</h1>
            <div className = 'imageContainer'>
                <img src = {landingImage} alt = "LandingImage" className = 'f1Image' />
            </div>
            <button className = 'buttonGo' onClick = {handleToHome}>Lets GO!</button>
        </div>
    );
}
//----------------------------------------------
export default Landing;