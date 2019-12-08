import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSerieDetails,
  getCredits,
  getRecommendations
} from 'actions/_series';
import { ISeriesInistialState } from 'interfaces';
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
  const seriesState: ISeriesInistialState = useSelector(
    (state: any) => state.series
  );
  const [castMember, setCastMember] = useState<number | null>(null);

  const serie = seriesState.serie;
  const loading = seriesState.fetchRequested;
  const error = seriesState.fetchFailed;
  const recommendation = seriesState.recommendations;
  const cast = seriesState.cast;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    dispatchAction(getSerieDetails(parseInt(id!)));
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
      {serie !== undefined && cast !== undefined ? (
        <Details
          id={serie.id}
          type='tv'
          title={serie.name}
          releaseDate={serie.release_date!}
          poster={serie.poster_path!}
          productionCompanies={serie.production_companies}
          runtime={serie.episode_run_time[0]}
          vote={serie.vote_average!}
          overview={serie.overview!}
          genres={serie.genres!}
          cast={cast}
          totalSeason={serie.number_of_seasons}
          totalEpisodes={serie.number_of_episodes}
          callback={(id: number) => {
            setCastMember(id);
          }}
        />
      ) : null}

      {/* show recommendation */}
      <div className='recommendation-container'>
        <H2>recommendation</H2>
        <Recommendations type='serie' series={recommendation} />
      </div>
    </MovieItemWrapper>
  );
};

export default MovieItem;
