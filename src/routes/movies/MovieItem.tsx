import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMovieDetails,
  getRecommendations,
  getCredits
} from 'actions/_movies';
import { IMovieInistialState } from 'interfaces';
import { Loader, Card } from 'components';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import Details from 'components/details';
import { Subline } from 'elements/Typography';

const MovieItemWrapper = styled.div`
  padding: 1rem;
  margin: 3rem 0;
  .recommendation-container {
    padding: 0 2.5%;
    margin: 4rem 0;
    margin-bottom: 1rem;
    h2 {
      font-size: 2rem;
      font-weight: 500;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
    .recommendation {
      width: 90.5%;
      display: flex;
    }
  }
`;

const MovieItem: React.FC<RouteComponentProps> = ({ history }) => {
  const { id } = useParams();
  const dispatchAction = useDispatch();
  const movieState: IMovieInistialState = useSelector(
    (state: any) => state.movies
  );
  const [castMember, setCastMember] = useState<number | null>(null);

  const { movie } = movieState;
  const loading = movieState.fetchRequested;
  const error = movieState.fetchFailed;
  const recommendation = movieState.results;
  const cast = movieState.cast;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    dispatchAction(getMovieDetails(parseInt(id!)));
    dispatchAction(getRecommendations(parseInt(id!)));
    dispatchAction(getCredits(parseInt(id!)));
  }, [id]);

  const handleClickReccomondation = (id: number) => {
    history.replace({
      pathname: `/movies/details/${id}`
    });
  };

  useEffect(() => {
    if (castMember !== null) {
      history.push({
        pathname: `/search/people/${castMember}`
      });
    }
  }, [castMember]);

  const handleReccomondation = ():
    | Array<React.ReactElement>
    | React.ReactElement => {
    let reccomondationContent;
    if (recommendation !== undefined) {
      reccomondationContent = recommendation.slice(0, 5).map(movie => {
        return (
          <Card
            style={{ margin: '2rem 1rem' }}
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
  // TODO: exctract into small components
  return (
    <MovieItemWrapper>
      {/* movie details */}
      {movie !== undefined && cast !== undefined ? (
        <Details
          type='movie'
          title={movie.title}
          tagline={movie.tagline}
          releaseDate={movie.release_date!}
          poster={movie.poster_path!}
          productionCompanies={movie.production_companies}
          runtime={movie.runtime}
          vote={movie.vote_average!}
          overview={movie.overview!}
          genres={movie.genres!}
          cast={cast}
          callback={(id: number) => {
            setCastMember(id);
          }}
        />
      ) : null}

      {/* show recommendation */}
      <div className='recommendation-container'>
        <Subline>recommendation</Subline>
        <div className='recommendation'>{handleReccomondation()}</div>
      </div>
    </MovieItemWrapper>
  );
};

export default MovieItem;
