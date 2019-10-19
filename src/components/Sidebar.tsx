import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled, {
  ThemeProps as StyleThemeProps,
  ThemeContext
} from 'styled-components';
import ThemeProps from 'interfaces/ThemeProps';
import { Home, Movie, Series } from 'icons';
import Logo from './Logo';

const StyledSidebar = styled.div`
  position: static;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 20vw;
  height: 100vh;
  background-color: ${(props: StyleThemeProps<ThemeProps>) =>
    props.theme.secondaryBackgroundColour};
`;

const Nav = styled.nav`
  position: static;
  width: 100%;
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

  return (
    <StyledSidebar>
      <Logo />
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
        </ul>
      </Nav>
    </StyledSidebar>
  );
};

export default Sidebar;
