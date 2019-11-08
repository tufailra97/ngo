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
      pathname: `/people/${id}`
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
        <div>
          <Subline>Movies</Subline>
          {moviesContainer}
        </div>
      )}
      {/* series */}
      {seriesContainer.length > 0 && (
        <div>
          <Subline>Series</Subline>
          {seriesContainer}
        </div>
      )}
      {/* persons */}
      {personsContainer.length > 0 && (
        <div>
          <Subline>Persons</Subline>
          {personsContainer}
        </div>
      )}
    </SearchWrapper>
  );
};

export default Search;
