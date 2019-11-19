import React, { useState, useEffect, useRef, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Next, Prev } from 'icons';
import { ThemeProps } from 'interfaces';

interface IMinimalCarousel {
  translate: number;
}

const MinimalCarouselContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .MinimalCarousel-control {
    width: 2rem;
    cursor: pointer;
  }

  header button {
    /* regular css  */
    transition: background-color 0.5s linear, transform 0.8s ease;
  }

  header button:hover {
    transform: scale(1.5);
  }

  .MinimalCarousel-outer-wrapper {
    width: 56rem;
    overflow: hidden;
    .MinimalCarousel-wrapper {
      display: flex;
      transition: transform 0.5s ease;
    }
  }
`;

const MinimalCarousel: React.FC<IMinimalCarousel> = ({
  children,
  translate
}) => {
  const theme: ThemeProps = useContext(ThemeContext);
  const [index, setIndex] = useState(0);
  const [showControls, setControlStatus] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    if (!(index === -(React.Children.count(children) - 8))) {
      setIndex(index - 1);
    }
  };
  const handleNext = () => {
    if (!(index === 0)) {
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    let childrenWidth = React.Children.count(children) * translate;
    let parentWidth = 0;

    if (wrapperRef.current !== null) {
      parentWidth = wrapperRef.current.clientWidth;
    }

    if (childrenWidth < parentWidth) {
      setControlStatus(false);
    }
  });
  return (
    <MinimalCarouselContainer>
      {showControls && (
        <div
          className='MinimalCarousel-control MinimalCarousel-prev-arrow'
          onClick={handleNext}
        >
          <Prev width={20} height={20} color={theme.textColour} />
        </div>
      )}

      <div className='MinimalCarousel-outer-wrapper' ref={wrapperRef}>
        <div
          className='MinimalCarousel-wrapper'
          style={{ transform: `translateX(${index * translate}px)` }}
        >
          {children}
        </div>
      </div>
      {showControls && (
        <div
          className='MinimalCarousel-control MinimalCarousel-next-arrow'
          onClick={handlePrev}
        >
          <Next width={20} height={20} color={theme.textColour} />
        </div>
      )}
    </MinimalCarouselContainer>
  );
};

export default MinimalCarousel;
