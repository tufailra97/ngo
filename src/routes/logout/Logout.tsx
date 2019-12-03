import React, { useState } from 'react';
import styled, { ThemeProps as StyledThemeProps } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Headline, Paragraph } from 'elements/Typography';
import { logout as _logout } from 'actions/_auth';
import { Button } from 'elements/Button';
import { AuthState } from 'interfaces';

const LogoutWrapper = styled.div`
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

const Logout: React.FC<RouteComponentProps> = ({ history }) => {
  const dispathActions = useDispatch();
  const [logoutState, setLogoutState] = useState(false);
  const authState: AuthState = useSelector((state: any) => state.auth);

  const handleLogout = () => {
    setLogoutState(true);
    setTimeout(() => {
      dispathActions(_logout());
      history.push({
        pathname: '/'
      });
    }, 1000);
  };

  if (!authState.isUserLoggedIn) {
    history.push({
      pathname: '/'
    });
  }

  return (
    <LogoutWrapper>
      <Headline>Sure you want to log out?</Headline>
      <div className='action-container'>
        <Button onClick={() => history.push({ pathname: '/home' })}>
          Go Home
        </Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      {logoutState && (
        <Paragraph>
          You have been logged out successfully
          <br />
          Redirecting you to the home page
        </Paragraph>
      )}
    </LogoutWrapper>
  );
};

export default Logout;
