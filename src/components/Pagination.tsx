import React from 'react';
import styled from 'styled-components';

interface IPagination {
  total_results: number;
  itemPerPage: number;
  currentPage: number;
  callback: Function;
}

const PaginationWrapper = styled.div`
  .item {
    background: blue;
    border-radius: 30px;
    padding: 10px;
    cursor: pointer;
  }
  .current {
    background-color: red;
  }
`;

const Pagination: React.FC<IPagination> = ({
  total_results,
  itemPerPage,
  currentPage,
  callback
}) => {
  const handleChangePage = (e: any) => {
    const index = parseInt(e.target.getAttribute('value-index'));

    callback(index);
  };

  let pages = [];
  const total_pagess = Math.round(total_results / itemPerPage);
  for (var index = 0; index < total_pagess; index++) {
    pages.push(
      <div
        value-index={index}
        onClick={handleChangePage}
        style={{ margin: '0 10px' }}
        key={index}
        className={`${currentPage === index ? 'current' : ''} item`}
      >
        {index + 1}
      </div>
    );
  }

  return (
    <PaginationWrapper style={{ display: 'flex' }}>{pages}</PaginationWrapper>
  );
};

export default Pagination;
