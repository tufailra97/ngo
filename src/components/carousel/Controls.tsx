import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Next, Prev } from 'icons';
import { ThemeProps } from 'interfaces';

interface IControls {
  type: 'next' | 'prev';
  onClick: Function;
  currentIndex: number;
}

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 18rem;
  margin-right: 0.5rem;
  cursor: pointer;
  background-color: orange;

  &:hover {
  }
`;

const Controls: React.FC<IControls> = ({ type, onClick, currentIndex = 0 }) => {
  const theme: ThemeProps = useContext(ThemeContext);

  if (type === 'next') {
    return (
      <ControlsWrapper
        style={{ marginBottom: '0.3rem' }}
        onClick={() => {
          onClick(++currentIndex);
        }}
      >
        <Next width={20} height={20} color={theme.textColour} />
      </ControlsWrapper>
    );
  }
  return (
    <ControlsWrapper
      onClick={() => {
        onClick(--currentIndex);
      }}
    >
      <Prev width={20} height={20} color={theme.textColour} />
    </ControlsWrapper>
  );
};

export default Controls;
