import React, { useState, useEffect } from 'react';
import styled, { ThemeProps as StyledThemeProps } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getFavourites } from 'actions/_favourites';
import { RouteComponentProps } from 'react-router';
import { AuthState, IFavouriteState } from 'interfaces';
import { Headline, Subline, Paragraph } from 'elements/Typography';
import { Button } from 'elements';

const FavouriteWrapper = styled.div`
  width: 107.5rem;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  h1 {
    text-transform: uppercase;
    margin: 3rem 0 0;
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

  if (!auth.isUserLoggedIn) {
    return (
      <ErrorWrapper>
        <Headline>
          You must login to view <br />
          the content in this page.
        </Headline>
        <Button onClick={() => history.push('/login')}>Login</Button>
      </ErrorWrapper>
    );
  }

  if (!favourites.items || favourites.items.length < 1) {
    return (
      <FavouriteWrapper>
        <Headline>Favourite</Headline>
        <div className='no-favourites'>
          <Paragraph>You have favourites</Paragraph>
        </div>
      </FavouriteWrapper>
    );
  }

  return (
    <FavouriteWrapper>
      <Headline style={{ textTransform: 'uppercase' }}>Favourite</Headline>
      <Subline></Subline>
    </FavouriteWrapper>
  );
};

export default Favourite;
