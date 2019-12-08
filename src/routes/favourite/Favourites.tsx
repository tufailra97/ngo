import React, { useState, useEffect } from 'react';
import styled, { ThemeProps as StyledThemeProps } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getFavourites } from 'actions/_favourites';
import { RouteComponentProps } from 'react-router';
import { AuthState, IFavouriteState, IFavourite } from 'interfaces';
import { H1, H2, Paragraph } from 'elements/Typography';
import { Button } from 'elements';
import { Recommendations } from 'components';

const FavouriteWrapper = styled.div`
  width: 107.5rem;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  h1 {
    text-transform: uppercase;
    margin: 3rem 0 3rem;
  }

  .no-favourites {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    p {
      text-transform: uppercase;
    }
  }
`;

const ErrorWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    text-align: center;
    margin-bottom: 3rem;
  }
`;

const Favourite: React.FC<RouteComponentProps> = ({ history }) => {
  const dispathActions = useDispatch();
  const state = useSelector((state: any) => state);
  const auth: AuthState = state.auth;
  const favourites: IFavouriteState = state.favourites;
  let items: { movies: Array<IFavourite>; series: Array<IFavourite> } = {
    movies: [],
    series: []
  };

  useEffect(() => {
    if (
      auth.isUserLoggedIn &&
      auth.userDetails.userID &&
      auth.userDetails.token
    ) {
      dispathActions(
        getFavourites(auth.userDetails.userID, auth.userDetails.token)
      );
    }
  }, []);

  const hadleFavourites = (): {
    movies: Array<IFavourite>;
    series: Array<IFavourite>;
  } => {
    if (favourites.items && favourites.items.length > 1) {
      favourites.items.forEach(item => {
        item.type === 'movie'
          ? items.movies.push(item)
          : items.series.push(item);
      });
    }

    return items;
  };

  if (!auth.isUserLoggedIn) {
    return (
      <ErrorWrapper>
        <H1>
          You must login to view <br />
          the content in this page.
        </H1>
        <Button onClick={() => history.push('/login')}>Login</Button>
      </ErrorWrapper>
    );
  }

  // change style
  if (!favourites.items || favourites.items.length < 1) {
    return (
      <FavouriteWrapper>
        <H1>Favourite</H1>
        <div className='no-favourites'>
          <Paragraph>You have no favourites</Paragraph>
        </div>
      </FavouriteWrapper>
    );
  }

  const data = hadleFavourites();

  return (
    <FavouriteWrapper>
      <H1 style={{ textTransform: 'uppercase' }}>Favourites</H1>
      {data.movies.length > 0 && (
        <div className='movies'>
          <H2>Movies</H2>
          <Recommendations type='movie' movies={data.movies} limit={false} />
        </div>
      )}

      {data.series.length > 0 && (
        <div className='series'>
          <H2>Serires</H2>
          <Recommendations type='serie' series={data.series} limit={false} />
        </div>
      )}
    </FavouriteWrapper>
  );
};

export default Favourite;
