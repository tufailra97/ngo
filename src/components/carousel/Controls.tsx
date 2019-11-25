import React, { useContext } from 'react';
import styled, {
  ThemeContext,
  ThemeProps as StyledThemeProps
} from 'styled-components';
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

  &.prev {
    /* TODO: find better colours */
    background-color: ${(props: StyledThemeProps<ThemeProps>) =>
      props.theme.colour2};

    &:hover {
      background-color: ${(props: StyledThemeProps<ThemeProps>) =>
        props.theme.lightTextColour};

      svg {
        fill: ${(props: StyledThemeProps<ThemeProps>) => props.theme.colour2};
      }
    }
  }

  &.next {
    /* TODO: find better colours */
    background-color: ${(props: StyledThemeProps<ThemeProps>) =>
      props.theme.lightTextColour};

    &:hover {
      background-color: ${(props: StyledThemeProps<ThemeProps>) =>
        props.theme.colour2};

      svg {
        fill: ${(props: StyledThemeProps<ThemeProps>) =>
          props.theme.lightTextColour};
      }
    }
  }

  &.next,
  &.prev {
    transition: background-color 0.5s ease;
    box-shadow: 0px 0px 11px -1px rgba(0, 0, 0, 0.5);
  }
`;

const Controls: React.FC<IControls> = ({ type, onClick, currentIndex = 0 }) => {
  const theme: ThemeProps = useContext(ThemeContext);

  if (type === 'next') {
    return (
      <ControlsWrapper
        className='next'
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
      className='prev'
      onClick={() => {
        onClick(--currentIndex);
      }}
    >
      <Prev width={20} height={20} color={theme.lightTextColour} />
    </ControlsWrapper>
  );
};

export default Controls;
