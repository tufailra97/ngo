import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSerieDetails, getCredits, getRecommendations } from "actions/_series";
import { ISeriesInistialState } from "interfaces";
import { Loader, Card } from "components";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import Details from "components/details";
import { Subline } from "elements/Typography";

const MovieItemWrapper = styled.div`
  padding: 1rem;
  margin: 3rem 0;
  .reccomondation-container {
    padding: 0 2.5%;
    margin: 4rem 0;
    margin-bottom: 1rem;
    h2 {
      font-size: 2rem;
      font-weight: 500;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
    .reccomondation {
      width: 90.5%;
      display: flex;
      justify-content: space-between;
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
  const reccomondation = seriesState.recommendations;
  const cast = seriesState.cast;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatchAction(getSerieDetails(parseInt(id!)));
    dispatchAction(getRecommendations(parseInt(id!)));
    dispatchAction(getCredits(parseInt(id!)));
  }, [id]);

  const handleClickReccomondation = (id: number) => {
    history.replace({
      pathname: `/series/details/${id}`
    });
  };

  useEffect(() => {
    if (castMember !== null) {
      history.push({
        pathname: `/people/${castMember}`
      });
    }
  }, [castMember]);

  const handleReccomondation = ():
    | Array<React.ReactElement>
    | React.ReactElement => {
    let reccomondationContent;
    if (reccomondation !== undefined) {
      reccomondationContent = reccomondation.slice(0, 5).map(movie => {
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
  // TODO: exctract into small components
  return (
    <MovieItemWrapper>
      {/* movie details */}
      {serie !== undefined && cast !== undefined ? (
        <Details
          type="tv"
          title={serie.title}
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

      {/* show reccomondation */}
      <div className="reccomondation-container">
        <Subline>Reccomondation</Subline>
        <div className="reccomondation">{handleReccomondation()}</div>
      </div>
    </MovieItemWrapper>
  );
};

export default MovieItem;
