import './pagination.css';

const Pagination = ({ pagination, totalOfPages }) =>
{
    const pages = [];
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
                        className = "pagination-button"
                        onClick = {() => pagination(page)}>
                        {page}
                    </button>
                ))
            }
        </div>
    );
}
//---------------------------------------------- 
export default Pagination;