import React, { useState, useEffect, useRef, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Next, Prev } from 'icons';
import { ThemeProps } from 'interfaces';

interface ICarousel {
  translate: number;
}

const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .carousel-control {
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

  .carousel-outer-wrapper {
    width: 56rem;
    overflow: hidden;
    .carousel-wrapper {
      display: flex;
      transition: transform 0.5s ease;
    }
  }
`;

const Carousel: React.FC<ICarousel> = ({ children, translate }) => {
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
    <CarouselContainer>
      {showControls && (
        <div
          className='carousel-control carousel-prev-arrow'
          onClick={handleNext}
        >
          <Prev width={20} height={20} color={theme.textColour} />
        </div>
      )}

      <div className='carousel-outer-wrapper' ref={wrapperRef}>
        <div
          className='carousel-wrapper'
          style={{ transform: `translateX(${index * translate}px)` }}
        >
          {children}
        </div>
      </div>
      {showControls && (
        <div
          className='carousel-control carousel-next-arrow'
          onClick={handlePrev}
        >
          <Next width={20} height={20} color={theme.textColour} />
        </div>
      )}
    </CarouselContainer>
  );
};

export default Carousel;
