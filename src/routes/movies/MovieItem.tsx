import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetails, getRecommendations } from 'actions/_movies';
import { IMovieInistialState } from 'interfaces';
import { Loader, Card } from 'components';
import { RouteComponentProps } from 'react-router-dom';
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

const MovieItem: React.FC<RouteComponentProps> = ({ history }) => {
  const { id } = useParams();
  const dispatchAction = useDispatch();
  const movieState: IMovieInistialState = useSelector(
    (state: any) => state.movies
  );

  const movie = movieState.movie;
  const loading = movieState.fetchRequested;
  const error = movieState.fetchFailed;
  const reccomondation = movieState.results;

  useEffect(() => {
    dispatchAction(getMovieDetails(parseInt(id!)));
    dispatchAction(getRecommendations(parseInt(id!)));
  }, [id]);

  const handleClickReccomondation = (id: number) => {
    history.replace({
      pathname: `/movies/details/${id}`
    });
  };

  const handleReccomondation = ():
    | Array<React.ReactElement>
    | React.ReactElement => {
    let reccomondationContent;
    if (reccomondation !== undefined) {
      reccomondationContent = reccomondation.map(movie => {
        return (
          <Card
            key={movie.id}
            id={movie.id}
            title={movie.title}
            imageURL={movie.poster_path!}
            callback={handleClickReccomondation}
          />
        );
      });

      return reccomondationContent;
    } else {
      return <Loader />;
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <MovieItemStyle>
      {/* movie details */}
      {movie !== undefined ? (
        <div>
          <img src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} />
          <h2>{movie.original_title}</h2>
        </div>
      ) : null}

      {/* show reccomondation */}
      {handleReccomondation()}
    </MovieItemStyle>
  );
};

export default MovieItem;
