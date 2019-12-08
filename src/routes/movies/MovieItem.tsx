import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMovieDetails,
  getRecommendations,
  getCredits
} from 'actions/_movies';
import { IMovieInistialState } from 'interfaces';
import { Loader, Recommendations } from 'components';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import Details from 'components/details';
import { H2 } from 'elements/Typography';

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

  useEffect(() => {
    if (castMember !== null) {
      history.push({
        pathname: `/search/people/${castMember}`
      });
    }
  }, [castMember]);

  if (loading) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Loader />
      </div>
    );
  }
  // TODO: exctract into small components
  return (
    <MovieItemWrapper>
      {/* movie details */}
      {movie !== undefined && cast !== undefined ? (
        <Details
          id={movie.id}
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
        <H2>recommendation</H2>
        <Recommendations type='movie' movies={recommendation} />
      </div>
    </MovieItemWrapper>
  );
};

export default MovieItem;
