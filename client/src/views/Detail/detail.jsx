// Este componente es el DETAIL
//----------------------------------------------
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDriverById } from '../../redux/actions';
import './detail.css';
import { useNavigate } from 'react-router-dom';
//----------------------------------------------
const Detail = () =>
{
    const { id } = useParams();
    const driverDetail = useSelector(state => state.detail);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //---------------------------------
    // Cuando el componente se monta o el id cambia, busca los detalles del driver.
    useEffect(() => 
    {
        dispatch(getDriverById(id)); // Despacha action que busca al driver
    }, [dispatch, id]);
    console.log(driverDetail);
    //---------------------------------
    const handleBack = () =>
    {
        navigate('/home');
    }
    //---------------------------------
    return(
        <div className = 'firstContainer'>
            <button onClick = {handleBack} className = 'back-button'>x</button>
            <div className = 'detailContainer'>
                <div className = 'title-container'>
                    <h1 className = 'name-detail'>{driverDetail.forename} {driverDetail.surname}</h1>
                </div>
                <div className = 'imgContainer'>
                    <img src = {driverDetail.image} alt = {driverDetail.forename} className = 'img'/>
                </div>
                <div className = 'descriptionContainer'>
                    <span className = 'props'>Id: <span className = 'name-props'>{driverDetail.id}</span> </span>
                    <span className = 'props'>Nationality: <span className = 'name-props'>{driverDetail.nationality}</span> </span>
                    <span className = 'props'>DOB: <span className = 'name-props'>{driverDetail.dob}</span> </span>
                    <span className = 'props'>Teams: <span className = 'name-props'>{driverDetail.teams}</span> </span>
                    <span className = 'props'>Description: <span className = 'name-props'>{driverDetail.description}</span> </span>
                </div>
            </div>
        </div>
    );
}
//----------------------------------------------
export default Detail;