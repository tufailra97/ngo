import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouterProps, RouteComponentProps } from 'react-router-dom';
import { getTopRaped } from 'actions/_series';
import { ISeriesInistialState } from 'interfaces';
import { Card } from 'components';
import styled from 'styled-components';
import Pagination from 'components/Pagination';
import { Headline, Subline } from 'elements/Typography';

const SeriesWrapper = styled.div`
  header {
    margin: 3rem 0;
    padding: 0 3.5%;
    h1 {
      font-size: 3.5rem;
      margin-bottom: 0.2rem;
      text-transform: uppercase;
      font-weight: 400;
    }

    h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      text-transform: uppercase;
    }
  }
`;

const Series: React.FC<BrowserRouterProps & RouteComponentProps> = ({
  history
}) => {
  const seriesState: ISeriesInistialState = useSelector(
    (state: any) => state.series
  );
  const dispatchAction = useDispatch();
  const [page, setPage] = useState(1);

  const series = seriesState.results;

  console.log(series);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    dispatchAction(getTopRaped(page));
  }, [page]);

  const handleCallback = (id: number) => {
    history.push({
      pathname: `/series/details/${id}`
    });
  };
  return (
    <SeriesWrapper>
      <header>
        <Headline>Series</Headline>
        <Subline>Top Rated</Subline>
      </header>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly'
        }}
      >
        {series !== undefined && Array.isArray(series)
          ? series.map(serie => {
              return (
                <Card
                  title={serie.title}
                  imageURL={serie.poster_path!}
                  key={serie.id}
                  callback={handleCallback}
                  voteAverage={parseInt(serie.vote_average)}
                  showBadge
                  id={serie.id}
                />
              );
            })
          : null}
      </div>
      {series !== undefined && Array.isArray(series) ? (
        <Pagination
          callback={(page: number) => {
            setPage(page);
          }}
          total_results={seriesState.total_results!}
          itemPerPage={20}
          currentPage={page}
          limit={50}
        />
      ) : null}
    </SeriesWrapper>
  );
};

export default Series;
