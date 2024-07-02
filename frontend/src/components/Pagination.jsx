import React from 'react'
import PropTypes from 'prop-types'

const Pagination = ({page, pages, onPageChange}) => {

    const pageNumbers = [];
    for(let i=1;i<=pages; i++){
        pageNumbers.push(i);
    }

    return (
        <div className='flex justify-center'>
        <ul className='flex border'>
        {
            pageNumbers.map((number, index)=>(
                <li className={`px-2 py-1 ${page === number ? "bg-gray-200": ""}`} key={index}>
                    <button onClick={()=>onPageChange(number)}>{number}</button>
                </li>
            ))
        }
        </ul>
        </div>
    )
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
}

export default Pagination;
