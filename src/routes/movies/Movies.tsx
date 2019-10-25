import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNowPlaying } from 'actions/_movies';
import { IMovieInistialState } from 'interfaces';
import { BrowserRouterProps, RouteComponentProps } from 'react-router-dom';
import { Card } from 'components';

const Movies: React.FC<BrowserRouterProps & RouteComponentProps> = ({
  history
}) => {
  const dispathAction = useDispatch();
  const [page, setPage] = useState(1);
  const movieState: IMovieInistialState = useSelector(
    (state: any) => state.movies
  );

  useEffect(() => {
    dispathAction(getNowPlaying(1));
  }, [page]);

  const movies = movieState.results;

  const handleCallback = (id: number) => {
    history.push({
      pathname: `/movies/details/${id}`
    });
  };

  return (
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
  );
};

export default Movies;
