import React from 'react';
import { ThemeProps as StyledThemeProps } from 'styled-components';
import styled from 'styled-components';
import { ThemeProps } from 'interfaces';
const LoaderWrapper = styled.div`
  z-index: 1;
  flex-shrink: 0;

  div {
    width: 7rem;
    height: 7rem;
    overflow: hidden;
    border-color: transparent;
    border-top-color: ${(props: StyledThemeProps<ThemeProps>) =>
      props.theme.textColour};
    border-left-color: ${(props: StyledThemeProps<ThemeProps>) =>
      props.theme.textColour};
    border-style: solid;
    border-width: 0.5rem;
    border-radius: 50%;
    box-sizing: border-box;
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loader: React.FC = () => {
  return (
    <LoaderWrapper className='loader'>
      <div></div>
    </LoaderWrapper>
  );
};

export default Loader;
