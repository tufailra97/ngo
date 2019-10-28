import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetails, getRecommendations } from 'actions/_movies';
import { IMovieInistialState } from 'interfaces';
import styled from 'styled-components';
import Loader from 'components/Loader';

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
  console.log(movieState);

  const movie = movieState.movie;
  const loading = movieState.fetchRequested;
  const error = movieState.fetchFailed;

  useEffect(() => {
    dispatchAction(getMovieDetails(parseInt(id!)));
  }, [dispatchAction]);

  // useEffect(() => {
  //   dispatchAction(getRecommendations(parseInt(id!)));
  // }, [dispatchAction]);

  if (loading) {
    return <Loader />;
  }

  return (
    <MovieItemStyle>
      {movie !== undefined ? (
        <div>
          <img src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} />
          <h2>{movie.original_title}</h2>
        </div>
      ) : (
        <Loader />
      )}
    </MovieItemStyle>
  );
};

export default MovieItem;
