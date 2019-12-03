import React, { useState } from 'react';
import styled, { ThemeProps as StyledThemeProps } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

const FavouriteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  h1 {
    margin-bottom: 3rem;
  }
  button {
    margin: 0 2rem;
  }

  p {
    text-align: center;
    margin-top: 3rem;
  }
`;

const Favourite: React.FC<RouteComponentProps> = ({ history }) => {
  const dispathActions = useDispatch();
  const [FavouriteState, setFavouriteState] = useState(false);

  return <FavouriteWrapper></FavouriteWrapper>;
};

export default Favourite;
