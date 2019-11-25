import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IMovieResponse, IMovie, ISerie } from 'interfaces';
import { getNowPlaying } from 'actions/_movies';
import { getTrendingMovies, getTrendingSeries } from 'actions/_home';
import styled from 'styled-components';
import { Carousel } from 'components';
import Recommendation from 'components/Recommendations';
import { Headline, Subline } from 'elements/Typography';

const HomeWrapper = styled.div`
  margin-top: -2rem;

  .trending {
    width: 107.5rem;
    margin: 6rem auto;
    margin-bottom: 1rem;
    text-transform: uppercase;

    h1 {
      font-size: 1.8rem;
      font-weight: 600;
    }

    h2 {
      font-size: 1.4rem;
      font-weight: 400;
    }
  }
`;

const Home: React.FC = () => {
  const dispatchActions = useDispatch();
  const globalState: any = useSelector((state: any) => state); // TODO: assign appropriate type
  const movies: IMovieResponse = globalState.movies.results;
  const trendingMovies: Array<IMovie> = globalState.home.trendingMovies;
  const trendingSeries: Array<ISerie> = globalState.home.trendingSeries;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    dispatchActions(getNowPlaying(1));
    dispatchActions(getTrendingMovies());
    dispatchActions(getTrendingSeries());
  }, []);

  return (
    <HomeWrapper>
      {Array.isArray(movies) ? <Carousel data={movies} /> : null}
      <div className='trending'>
        <Headline>Trending Now</Headline>
        <Subline>Movies</Subline>
      </div>
      {trendingMovies && trendingMovies.length > 0 ? (
        <Recommendation type='movie' movies={trendingMovies} />
      ) : null}
      <div className='trending'>
        <Headline>Trending Now</Headline>
        <Subline>Series</Subline>
      </div>
      {trendingSeries && trendingSeries.length > 0 ? (
        <Recommendation type='serie' series={trendingSeries} />
      ) : null}
    </HomeWrapper>
  );
};

export default Home;
