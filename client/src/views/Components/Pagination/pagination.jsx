import { useState } from 'react';
import './pagination.css';

const Pagination = ({ pagination, totalOfPages }) =>
{
    const pages = [];
    const [ pageSelected, setPageSelected ] = useState(null);
    //---------------
    for (let i = 1; i <= totalOfPages; i++) pages.push(i);
    //---------------
    return(
        <div className = "pagination">
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
        </div>
    );
}
//---------------------------------------------- 
export default Pagination;