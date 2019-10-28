import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    content: '';
    width: 1rem;
    height: 2rem;
    background-color: red;
    margin: 0 0.2rem;
    animation-name: loader-animation;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease;
  }

  @keyframes loader-animation {
    0% {
      transform: scaleY(1.2) scaleX(0.9);
    }
    50% {
      transform: scaleY(1.2) scaleX(0.9);
    }
    100% {
      transform: scaleY(1.2) scaleX(0.9);
    }
  }
`;

const Loader: React.FC = () => {
  return (
    <LoaderWrapper>
      <div></div>
      <div></div>
      <div></div>
    </LoaderWrapper>
  );
};

export default Loader;
