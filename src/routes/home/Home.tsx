import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel } from 'components';
import { IMovieInistialState } from 'interfaces';
import { getNowPlaying } from 'actions/_movies';

const Home: React.FC = () => {
  const dispatchActions = useDispatch();
  const movieState: IMovieInistialState = useSelector(
    (state: any) => state.movies
  );

  const movies = movieState.results;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    dispatchActions(getNowPlaying(1));
  }, []);

  return (
    <div style={{ marginTop: '-2rem' }}>
      {Array.isArray(movies) ? <Carousel data={movies} /> : null}
    </div>
  );
};

export default Home;
