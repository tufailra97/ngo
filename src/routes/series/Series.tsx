import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouterProps, RouteComponentProps } from 'react-router-dom';
import { getTopRaped } from 'actions/_series';
import { ISeriesInistialState } from 'interfaces';
import { Card } from 'components';
import styled from 'styled-components';
import Pagination from 'components/Pagination';
import { H1, H3 } from 'elements/Typography';

const SeriesWrapper = styled.div`
  header {
    margin: 3rem 0;
    padding: 0 3.5%;
    h1 {
      margin-bottom: 0.2rem;
      text-transform: uppercase;
      font-weight: 400;
    }

    h3 {
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    dispatchAction(getTopRaped(page));
  }, [page]);

  const handleCallback = (id: number) => {
    console.log('id ---->', id);

    history.push({
      pathname: `/series/details/${id}`
    });
  };

  return (
    <SeriesWrapper>
      <header>
        <H1>Series</H1>
        <H3>Top Rated</H3>
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
                  title={serie.name}
                  imageURL={serie.poster_path!}
                  key={serie.id}
                  callback={handleCallback}
                  voteAverage={serie.vote_average}
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
