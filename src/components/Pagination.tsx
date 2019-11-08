import React, { useContext } from 'react';
import styled, {
  ThemeProps as StyleThemeProps,
  ThemeContext
} from 'styled-components';
import { ThemeProps } from 'interfaces';
import { LeftArrow, RightArrow } from 'icons';

interface IPagination {
  total_results: number;
  itemPerPage: number;
  currentPage: number;
  callback: Function;
  limit: number;
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0 3rem 0;

  .pagination-items-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 2rem;

    .pagination-item {
      list-style: none;
      font-weight: 500;
      font-size: 1.5rem;
      text-align: center;
      line-height: 3rem;
      color: ${(props: StyleThemeProps<ThemeProps>) =>
        props.theme.secondaryTextColour};
      width: 3rem;
      height: 3rem;
      cursor: pointer;
      border-radius: 50%;
      transition: background-color 0.5s ease-in;

      &:hover {
        background-color: ${(props: StyleThemeProps<ThemeProps>) =>
          props.theme.darkBackground};
        border-radius: 50%;
        color: ${(props: StyleThemeProps<ThemeProps>) =>
          props.theme.lightTextColour};
      }
    }

    .current-pagination-item {
      background-color: ${(props: StyleThemeProps<ThemeProps>) =>
        props.theme.darkBackground};
      color: ${(props: StyleThemeProps<ThemeProps>) =>
        props.theme.lightTextColour};
    }
  }
  .controls {
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.1);
    }

    .control-text {
      font-size: 1.4rem;
      margin: 0 1rem;
    }
  }
`;

const Pagination: React.FC<IPagination> = ({
  total_results,
  itemPerPage,
  currentPage,
  callback,
  limit
}) => {
  const theme = useContext<ThemeProps>(ThemeContext);

  const handleChangePage = (e: any): void => {
    const index = parseInt(e.target.getAttribute('value-index'));
    callback(index);
  };

  const handlePrevPage = (): void => {
    if (!(currentPage === 1)) {
      callback(currentPage - 1);
    }
  };

  const handleNextPage = (): void => {
    if (!(currentPage === totalPages)) {
      callback(currentPage + 1);
    }
  };

  let pages: Array<React.ReactElement> = [];
  // total pages
  const totalPages =
    Math.ceil(total_results / itemPerPage) > limit
      ? limit
      : Math.round(total_results / itemPerPage);
  // start index
  let startIndex: number = currentPage;
  if (currentPage < 2) {
    startIndex = currentPage;
  } else if (currentPage < 5) {
    startIndex = currentPage - 1;
  } else {
    startIndex = currentPage - 2;
  }
  // end index
  const endIndex: number =
    startIndex + 4 > totalPages ? totalPages : startIndex + 4;
  for (var index = startIndex; index <= endIndex; index++) {
    pages.push(
      <li
        value-index={index}
        onClick={handleChangePage}
        style={{ margin: '0 10px' }}
        key={index}
        className={`${
          currentPage === index ? 'current-pagination-item' : ''
        } pagination-item`}
      >
        {index}
      </li>
    );
  }

  return (
    <PaginationWrapper style={{ display: 'flex' }}>
      <div className='controls' onClick={handlePrevPage} control-type='prev'>
        <span>
          <LeftArrow width={30} height={20} color={theme.textColour} />
        </span>
        <span className='control-text'>prev</span>
      </div>
      <ul className='pagination-items-wrapper'>{pages}</ul>
      <div className='controls' onClick={handleNextPage} control-type='next'>
        <span className='control-text'>next</span>
        <RightArrow width={30} height={20} color={theme.textColour} />
      </div>
    </PaginationWrapper>
  );
};

export default Pagination;
