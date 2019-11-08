import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import {
  ISearchInitialState,
  ISearchMovie,
  ISearchSerie,
  ISearchPerson
} from 'interfaces';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  margin-top: 2rem;
  padding: 0 3.5%;
`;

const Search: React.FC = () => {
  const search: ISearchInitialState = useSelector((state: any) => state.search);
  let movies: ISearchMovie | Array<ISearchMovie> = [],
    series: ISearchSerie | Array<ISearchSerie> = [],
    persons: ISearchPerson | Array<ISearchPerson> = [];
  if (search) {
    movies = search.results.movies!;
    series = search.results.series!;
    persons = search.results.persons!;
  }

  console.log('movies', movies);

  return <SearchWrapper>Search</SearchWrapper>;
};

export default Search;
