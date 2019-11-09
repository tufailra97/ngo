import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouterProps, RouteComponentProps } from 'react-router-dom';
import { Headline, Subline } from 'elements/Typography';
import { getNowPlaying } from 'actions/_movies';
import { IMovieInistialState } from 'interfaces';
import { Card } from 'components';
import styled from 'styled-components';
import Pagination from 'components/Pagination';

const MovieWrapper = styled.div`
  header {
    margin: 3rem 0;
    padding: 0 3.5%;
    h1 {
      font-size: 3.5rem;
      margin-bottom: 0.2rem;
      text-transform: uppercase;
      font-weight: 400;
    }

    h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      text-transform: uppercase;
    }
  }
`;

const Movies: React.FC<BrowserRouterProps & RouteComponentProps> = ({
  history
}) => {
  const dispathAction = useDispatch();
  const [page, setPage] = useState(1);
  const movieState: IMovieInistialState = useSelector(
    (state: any) => state.movies
  );
  const movies = movieState.results;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    dispathAction(getNowPlaying(page));
  }, [page]);

  const handleCallback = (id: number) => {
    history.push({
      pathname: `/movies/details/${id}`
    });
  };

  return (
    <MovieWrapper>
      <header>
        <Headline>Movie</Headline>
        <Subline>Now Playing</Subline>
      </header>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly'
        }}
      >
        {movies !== undefined && Array.isArray(movies)
          ? movies.map(movie => {
              return (
                <Card
                  title={movie.title}
                  imageURL={movie.poster_path!}
                  key={movie.id}
                  callback={handleCallback}
                  voteAverage={movie.vote_average}
                  showBadge
                  id={movie.id}
                />
              );
            })
          : null}
      </div>
      {movies !== undefined && Array.isArray(movies) ? (
        <Pagination
          callback={(index: number) => {
            setPage(index);
          }}
          total_results={movieState.total_results!}
          itemPerPage={20}
          currentPage={page}
          limit={50}
        />
      ) : null}
    </MovieWrapper>
  );
};

export default Movies;
