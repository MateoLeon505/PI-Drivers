const Pagination = ({ pagination, totalOfPages }) =>
{
    const pages = [];
    //---------------
    for (let i = 0; i <= totalOfPages; i++) pages.push(i);
    //---------------
    return(
        <div className = "pagination">
            {
                pages.map((page) => 
                (
                    <button>
                        {page}
                    </button>
                ))
            }
        </div>
    );
}
//---------------------------------------------- 
export default Pagination;
