import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNowPlaying } from 'actions/_movies';
import { IMovieInistialState } from 'interfaces';
import { BrowserRouterProps, RouteComponentProps } from 'react-router-dom';
import { Card } from 'components';
import Pagination from 'components/Pagination';

const Movies: React.FC<BrowserRouterProps & RouteComponentProps> = ({
  history
}) => {
  const dispathAction = useDispatch();
  const [page, setPage] = useState(1);
  const movieState: IMovieInistialState = useSelector(
    (state: any) => state.movies
  );
  const movies = movieState.results;

  useEffect(() => {
    dispathAction(getNowPlaying(page));
  }, [page]);

  const handleCallback = (id: number) => {
    history.push({
      pathname: `/movies/details/${id}`
    });
  };
  console.log('page ----> ', page);

  return (
    <div>
      {movies !== undefined && Array.isArray(movies) ? (
        <Pagination
          callback={(index: number) => {
            setPage(index);
          }}
          total_results={movieState.total_results!}
          itemPerPage={20}
          currentPage={page}
        />
      ) : null}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly'
        }}
      >
        {movies !== undefined && Array.isArray(movies)
          ? movies.map(movie => {
              return (
                <Card
                  title={movie.title}
                  imageURL={movie.poster_path!}
                  key={movie.id}
                  callback={handleCallback}
                  voteAverage={movie.vote_average}
                  showBadge
                  id={movie.id}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Movies;
