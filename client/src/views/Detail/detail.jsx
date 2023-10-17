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
    return(
        <div className = 'firstContainer'>
            
            <div className = 'detailContainer'>
            <button className = 'back-button' onClick = {() => navigate('/home')}>x</button>
                <div className = 'imgContainer'>
                    <img src = {driverDetail.image} alt = {driverDetail.forename} className = 'img'/>
                </div>

                <div className = 'props-container'>
                <h1 className = 'name-detail'>{`${driverDetail.forename} ${driverDetail.surname}`}</h1>
                    <div className = 'prop'>
                        <span className = 'prop-label'>Id: </span>
                        <span className = 'props-content'>{driverDetail.id}</span>
                    </div>
                    <div className = 'prop'>
                        <span className = 'prop-label'>Nationality: </span>
                        <span className = 'props-content'>{driverDetail.nationality}</span>
                    </div>
                    <div className = 'prop'>
                        <span className = 'prop-label'>DOB: </span>
                        <span className = 'props-content'>{driverDetail.dob}</span>
                    </div>
                    <div className = 'prop'>
                        <span className = 'prop-label'>Teams: </span>
                        <span className = 'props-content'>{driverDetail.teams}</span>
                    </div>
                </div>

                <div className = 'descriptionContainer'>
                    <div className = 'prop'>
                        <span className = 'description-label'>Description: </span>
                        <span className = 'description-content'>{driverDetail.description}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
//----------------------------------------------
export default Detail;