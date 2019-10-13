import React from 'react';
import styled from 'styled-components';

const StyledLogo = styled.div`
  margin: 20px 0;
  width: 100%;
  font-size: 20px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
`;

const Logo: React.FC = () => {
  return <StyledLogo>NGO</StyledLogo>;
};

export default Logo;
