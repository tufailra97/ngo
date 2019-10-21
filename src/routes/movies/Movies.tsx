import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNowPlaying } from 'actions/_movies';
import { IMovieInistialState, IMovie } from 'interfaces';
import { Card } from 'components';

const Movies: React.FC = () => {
  const dispathAction = useDispatch();
  const [page, setPage] = useState(1);
  const movieState: IMovieInistialState = useSelector(
    (state: any) => state.movies
  );

  useEffect(() => {
    dispathAction(getNowPlaying(1));
  }, [page]);

  let movies = movieState.results;

  const handleCallback = () => {};
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
              />
            );
          })
        : null}
    </div>
  );
};

export default Movies;
