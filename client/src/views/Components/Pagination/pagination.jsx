import { useState } from 'react';
import './pagination.css';

const Pagination = ({ pagination, totalOfPages }) =>
{
    const pages = [];
    const [ pageSelected, setPageSelected ] = useState(null);
    //---------------
    for (let i = 1; i <= totalOfPages; i++) pages.push(i);
    //---------------
    const handlePrevClick = () => 
    {
        if (pageSelected > 1) 
        {
            const newPage = pageSelected - 1;
            pagination(newPage);
            setPageSelected(newPage);
        }
    };
    const handleNextClick = () => 
    {
        if (pageSelected < totalOfPages) 
        {
            const newPage = pageSelected + 1 ;
            pagination(newPage);
            setPageSelected(newPage);
        }
    };
    //---------------
    return(
        <div className = "pagination">
            <button className = 'prev-next' onClick = {handlePrevClick}>Prev</button>
            {
                pages.map((page) => 
                (
                    <button
                        key = {page}
                        className = {page === pageSelected ? "pagination-buttonSelected" : "pagination-button"}
                        onClick = {() => 
                            {
                                    pagination(page); 
                                    setPageSelected(page);
                            }}>
                        {page}
                    </button>
                ))
            }
            <button className = 'prev-next' onClick = {handleNextClick}>Next</button>
        </div>
    );
}
//---------------------------------------------- 
export default Pagination;


