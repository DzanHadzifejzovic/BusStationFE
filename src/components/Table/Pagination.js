import React,{useState} from 'react';
import { PaginationWrapper } from './Table.styles';
import ReactPaginate from 'react-paginate';

const Pagination = ({ items,count,itemsPerPage,setPageNum }) => {

    const handlePageClick = (event) => {
      const selected = event.selected + 1;
      setPageNum(selected);
    };

  return(
    <PaginationWrapper>
      <ReactPaginate
          className='react-paginate'
          breakLabel='...'
          nextLabel='> next'
          onPageChange={handlePageClick}
          pageRangeDisplayed={itemsPerPage}
          pageCount={Math.ceil(count/itemsPerPage)}
          previousLabel='< previous'
          renderOnZeroPageCount={null}
        />
    </PaginationWrapper>
  );
};

export default Pagination;