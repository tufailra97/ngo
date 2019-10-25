import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetails } from 'actions/_movies';
import { IMovieInistialState } from 'interfaces';
import styled from 'styled-components';

const MovieItemStyle = styled.div`
  padding: 1rem;
  img {
    width: 350px;
    height: auto;
  }

  h2 {
    text-align: center;
  }
`;

const MovieItem: React.FC = () => {
  const { id } = useParams();
  const dispatchAction = useDispatch();
  const movieState: IMovieInistialState = useSelector(
    (state: any) => state.movies
  );
  const movie = movieState.movie;
  const loading = movieState.fetchRequested;
  const error = movieState.fetchFailed;

  console.log('movie', movie);
  useEffect(() => {
    dispatchAction(getMovieDetails(parseInt(id!)));
  }, [dispatchAction]);

  console.log('moveis', movieState);

  if (loading) {
    return <div>LOADING</div>;
  }

  return (
    <MovieItemStyle>
      {movie !== undefined ? (
        <div>
          <img src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} />
          <h2>{movie.original_title}</h2>
        </div>
      ) : null}
    </MovieItemStyle>
  );
};

export default MovieItem;
