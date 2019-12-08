import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouterProps, RouteComponentProps } from 'react-router-dom';
import { H1, H2, H3 } from 'elements/Typography';
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
      margin-bottom: 0.2rem;
      text-transform: uppercase;
      font-weight: 400;
    }

    h3 {
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
        <H1>Movie</H1>
        <H3>Now Playing</H3>
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
