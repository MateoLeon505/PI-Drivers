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
            <div className = 'detailContainer'>
                <button onClick = {handleBack} className = 'back-button'>Back</button>
                <div className = 'imgContainer'>
                    <img src = {driverDetail.image} alt = {driverDetail.forename} className = 'img'/>
                </div>
                <div className = 'descriptionContainer'>
                    <h1 className = 'name'>{driverDetail.forename} {driverDetail.surname}</h1>
                    <span>Teams: {driverDetail.teams}</span>
                    <span>Description: {driverDetail.description}</span>
                    <span>Nationality: {driverDetail.nationality}</span>
                    <span>DOB: {driverDetail.dob}</span>
                    <span>ID: {driverDetail.id}</span>
                </div>
            </div>
        </div>
    );
}
//----------------------------------------------
export default Detail;