import React, { useContext, memo } from 'react';
import { NavLink } from 'react-router-dom';
import styled, {
  ThemeProps as StyleThemeProps,
  ThemeContext
} from 'styled-components';
import { useSelector } from 'react-redux';
import { ThemeProps, AuthState } from 'interfaces';
import {
  Home,
  Movie,
  Series,
  Search,
  Login,
  Logout,
  Register,
  EmptyStar,
  Avatar
} from 'icons';
import Logo from './Logo';

const StyledSidebar = styled.div`
  position: static;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 20vw;
  height: 100vh;

  & > div {
    position: fixed;
    height: 100vh;
    width: 20vw;
    background-color: ${(props: StyleThemeProps<ThemeProps>) =>
      props.theme.secondaryBackgroundColour};
  }

  .devider {
    margin-bottom: 1.2rem;
    span {
      text-transform: uppercase;
      font-weight: 600;
      margin-left: 2rem;
      font-size: 1.1rem;
      color: ${(props: StyleThemeProps<ThemeProps>) =>
        props.theme.secondaryTextColour};
    }
  }
`;

const Nav = styled.nav`
  position: static;
  width: 100%;
  margin-bottom: 2rem;
  ul {
  }
  li {
    list-style: none;
  }
`;
// class for active page
const active: string = 'active-page';

// link wrapper
const LinkWrapper = styled(NavLink).attrs({
  activeClassName: active // active calss
})`
  padding-left: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
  padding: 1rem 0 1rem 2.5rem;
  background-color: ${(props: StyleThemeProps<ThemeProps>) =>
    props.theme.secondaryBackgroundColour};
  color: ${(props: StyleThemeProps<ThemeProps>) => props.theme.textColour};
  font-weight: 500;

  &.${active} {
    background-color: ${(props: StyleThemeProps<ThemeProps>) =>
      props.theme.primaryBackgroundColour};
  }

  &:hover {
    background-color: ${(props: StyleThemeProps<ThemeProps>) =>
      props.theme.primaryBackgroundColour};
  }

  span {
    font-size: 1.2rem;
    margin-left: 1.5rem;
  }
`;

const Sidebar: React.FC = () => {
  const theme: ThemeProps = useContext(ThemeContext);
  const authState: AuthState = useSelector((state: any) => state.auth);

  return (
    <StyledSidebar>
      <div>
        <Logo />
        <div className='devider'>
          <span>Main</span>
        </div>
        <Nav>
          <ul>
            <li>
              <LinkWrapper activeClassName={active} to='/home'>
                <Home width={22} height={22} color={theme.textColour} />
                <span>Home</span>
              </LinkWrapper>
            </li>
            <li>
              <LinkWrapper activeClassName={active} to='/movies'>
                <Movie width={22} height={22} color={theme.textColour} />
                <span>Movie</span>
              </LinkWrapper>
            </li>
            <li>
              <LinkWrapper activeClassName={active} to='/series'>
                <Series width={22} height={22} color={theme.textColour} />
                <span>Serie</span>
              </LinkWrapper>
            </li>
            <li>
              <LinkWrapper activeClassName={active} to='/search'>
                <Search width={22} height={22} color={theme.textColour} />
                <span>Search</span>
              </LinkWrapper>
            </li>
          </ul>
        </Nav>
        <div className='devider'>
          <span>Settings</span>
        </div>
        <ul>
          {!authState.isUserLoggedIn ? (
            <>
              <LinkWrapper activeClassName={active} to='/login'>
                <Login width={22} height={22} color={theme.textColour} />
                <span>Login</span>
              </LinkWrapper>
              <LinkWrapper activeClassName={active} to='/register'>
                <Register width={22} height={22} color={theme.textColour} />
                <span>Register</span>
              </LinkWrapper>
            </>
          ) : (
            <>
              <LinkWrapper activeClassName={active} to='/favourites'>
                <EmptyStar width={22} height={22} color={theme.textColour} />
                <span>favourites</span>
              </LinkWrapper>
              <LinkWrapper activeClassName={active} to='/logout'>
                <Logout width={22} height={22} color={theme.textColour} />
                <span>Logout</span>
              </LinkWrapper>
              <LinkWrapper activeClassName={active} to='/profile'>
                <Avatar width={22} height={22} color={theme.textColour} />
                <span>Profile</span>
              </LinkWrapper>
            </>
          )}
        </ul>
      </div>
    </StyledSidebar>
  );
};

export default memo(Sidebar);
