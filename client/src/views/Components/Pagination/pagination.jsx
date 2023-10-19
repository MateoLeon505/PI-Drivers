import { useState, useEffect } from 'react';
import './pagination.css';

const Pagination = ({ pagination, totalOfPages }) =>
{
    //const pages = [];
    const [ pageSelected, setPageSelected ] = useState(1);
    const [visiblePages, setVisiblePages] = useState([]);
    //---------------
    const calculateVisiblePages = () =>
    {
        let start = pageSelected - 1;
        let end = start + 2;
      
        if (start < 1) {
          start = 1;
          end = Math.min(3, totalOfPages); // Limita 'end' al número total de páginas
        }
        if (end > totalOfPages) {
          end = totalOfPages;
          start = Math.max(1, end - 2); // Limita 'start' al número 1 o más
        }
        setVisiblePages(Array.from({ length: end - start + 1 }, (_, i) => start + i));
    }
    //-------
    useEffect(() =>
    {
        calculateVisiblePages();
    }, [pagination, totalOfPages]);
    //---------------
    //for (let i = 1; i <= totalOfPages; i++) pages.push(i);
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
            <button className = 'prev-next' onClick = {handlePrevClick}>f</button>
            {
                visiblePages.map((page) => 
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
            <button className = 'prev-next' onClick = {handleNextClick}>g</button>
        </div>
    );
}
//---------------------------------------------- 
export default Pagination;


