// Este componente es el Landing Page
//----------------------------------------------
import './landing.css';
import { useHistory } from 'react-router-dom';
//----------------------------------------------
const Landing = () =>
{
    const history = useHistory();

    const handleButtonClick = () => 
    {
        history.push('/home'); // Redirige al enlace '/home' al hacer clic en el botón
    };

    return(
        <div >
            <div className = "landing-images">
                <img src = '' alt = "Pokemon APP"/>
            </div>
            <span>Holi</span>
            <br />
            <button className = 'landingButton' onClick = {handleButtonClick}>
                Vamos!
            </button>
        </div>
    );
}
//----------------------------------------------
export default Landing