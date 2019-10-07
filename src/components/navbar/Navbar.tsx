import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/home'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/movies'>Movies</NavLink>
        </li>
        <li>
          <NavLink to='/series'>Series</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
