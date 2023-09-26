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
        <div className = 'detailContainer'>
            <button onClick = {handleBack}>Back</button>
            <h1 className = 'titles'>{driverDetail.forename.toUpperCase()} {driverDetail.surname.toUpperCase()}</h1>
            <img src = {driverDetail.image} alt = {driverDetail.forename} />
            <br />
            <span>Teams: {driverDetail.teams}</span>
            <br />
            <br />
            <span>Description: {driverDetail.description}</span>
            <br />
            <br />
            <span>DOB: {driverDetail.dob}</span>
            <br />
            <br />
            <span>Nationality: {driverDetail.nationality}</span>
            <br />
            <br />
            <span>ID: {driverDetail.id}</span>
        </div>
    );
}
//----------------------------------------------
export default Detail;