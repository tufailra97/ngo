import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import {
  ISearchInitialState,
  ISearchMovie,
  ISearchSerie,
  ISearchPerson
} from 'interfaces';
import styled from 'styled-components';
import { Card } from 'components';
import { Subline } from 'elements/Typography';
import { useHistory } from 'react-router-dom';

const SearchWrapper = styled.div`
  margin-top: 2rem;
  padding: 0 3.5%;

  h2 {
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: 400;
  }
  .results-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .search-item {
    width: 15rem;
    margin: 2rem 1.25rem;
  }

  .section {
    margin-top: 4rem;
  }
`;

const Search: React.FC = () => {
  const history = useHistory();
  const search: ISearchInitialState = useSelector((state: any) => state.search);
  let movies: ISearchMovie | Array<ISearchMovie> = [],
    series: ISearchSerie | Array<ISearchSerie> = [],
    persons: ISearchPerson | Array<ISearchPerson> = [];
  let personsContainer: Array<ReactElement> = [];
  let seriesContainer: Array<ReactElement> = [];
  let moviesContainer: Array<ReactElement> = [];

  const handlePersonDetails = (id: number) => {
    history.replace({
      pathname: `/search/people/${id}`
    });
  };
  const handleMovieDetails = (id: number) => {
    history.push({
      pathname: `/movies/details/${id}`
    });
  };
  const handleSerieDetails = (id: number) => {
    history.replace({
      pathname: `/series/details/${id}`
    });
  };

  if (search) {
    movies = search.results.movies!;
    series = search.results.series!;
    persons = search.results.persons!;
  }

  if (Array.isArray(persons) && persons.length > 0) {
    personsContainer = persons.map(person => {
      return (
        <Card
          className='person-item search-item'
          id={person.id}
          key={person.id}
          title={person.name!}
          imageURL={person.profile_path!}
          callback={handlePersonDetails}
        />
      );
    });
  }

  if (Array.isArray(series) && series.length > 0) {
    seriesContainer = series.map(serie => {
      return (
        <Card
          className='serie-item search-item'
          id={serie.id}
          key={serie.id}
          title={serie.name!}
          imageURL={serie.poster_path!}
          callback={handleSerieDetails}
        />
      );
    });
  }

  if (Array.isArray(movies) && movies.length > 0) {
    moviesContainer = movies.map(movie => {
      return (
        <Card
          className='movie-item search-item'
          id={movie.id}
          key={movie.id}
          title={movie.title!}
          imageURL={movie.poster_path!}
          callback={handleMovieDetails}
        />
      );
    });
  }

  return (
    <SearchWrapper>
      {/* movies */}
      {moviesContainer.length > 0 && (
        <div className='section'>
          <Subline>Movies</Subline>
          <div className='results-container'>{moviesContainer}</div>
        </div>
      )}
      {/* series */}
      {seriesContainer.length > 0 && (
        <div className='section'>
          <Subline>Series</Subline>
          <div className='results-container'>{seriesContainer}</div>
        </div>
      )}
      {/* persons */}
      {personsContainer.length > 0 && (
        <div className='section'>
          <Subline>People</Subline>
          <div className='results-container'>{personsContainer}</div>
        </div>
      )}
    </SearchWrapper>
  );
};

export default Search;
