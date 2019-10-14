import React from 'react';
import styled from 'styled-components';

const StyledLogo = styled.div`
  margin: 2rem 0;
  width: 100%;
  font-size: 2rem;
  text-align: center;
  font-weight: 700;
  color: ${(props: any) => props.theme.textColour};
`;

const Logo: React.FC = () => {
  return <StyledLogo>NGO</StyledLogo>;
};

export default Logo;
