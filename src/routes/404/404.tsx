import React from 'react';
import styled, { ThemeProps as StyledThemeProps } from 'styled-components';
import ThemeProps from 'interfaces/ThemeProps';
import { useHistory } from 'react-router-dom';
import { Button } from 'elements';

const PageNotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  h1,
  h2 {
    text-align: center;
    color: ${(props: StyledThemeProps<ThemeProps>) => props.theme.textColour};
    text-transform: uppercase;
  }

  h1 {
    font-size: 6rem;
  }

  h2 {
    font-size: 4rem;
    margin-bottom: 2rem;
  }
`;

const PageNotFound: React.FC = () => {
  const history = useHistory();

  return (
    <PageNotFoundWrapper>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Button onClick={() => history.push({ pathname: '/home' })}>
        Go Home
      </Button>
    </PageNotFoundWrapper>
  );
};

export default PageNotFound;
