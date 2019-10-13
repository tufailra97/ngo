import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import Logo from 'components/logo/Logo';

const StyledSidebar = styled.div`
  position: static;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;
`;

const Nav = styled.nav`
  position: static;
  ul {
    width: 100%;
  }
  li {
    list-style: none;
    padding: 10px 0;
    background-color: ${(props: any) => props.theme.bg};
  }
`;

const LinkWrapper = styled(NavLink)<NavLinkProps>`
  text-decoration: none;
  text-transform: uppercase;
`;

const Sidebar: React.FC = () => {
  return (
    <StyledSidebar>
      <Logo />
      <Nav>
        <ul>
          <li>
            <LinkWrapper to='/home'>Home</LinkWrapper>
          </li>
          <li>
            <LinkWrapper to='/movies'>Movies</LinkWrapper>
          </li>
          <li>
            <LinkWrapper to='/series'>Series</LinkWrapper>
          </li>
        </ul>
      </Nav>
    </StyledSidebar>
  );
};

export default Sidebar;
