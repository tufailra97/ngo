import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNowPlaying } from 'actions/_movies';
import { IMovieInistialState, IMovie } from 'interfaces';

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

  return (
    <div>
      {movies !== undefined && Array.isArray(movies)
        ? movies.map(movie => {
            return <div key={movie.id}>{movie.title}</div>;
          })
        : null}
    </div>
  );
};

export default Movies;
