import React, { useContext, useState, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Controls from './Controls';
import Contents from './Contents';
import { IMovie } from 'interfaces';

const Container = styled.div`
  position: relative;
  display: flex;
  width: 93%;
  margin: 0 auto;
  overflow: hidden;
`;

const Carousel: React.FC<{ data: Array<IMovie> }> = ({ data }) => {
  const [index, setIndex] = useState(0);

  const handleControls = (currentIndex: number): void => {
    setIndex(currentIndex);
  };

  useEffect(() => {
    if (index > 19) {
      setIndex(19);
    } else if (index < 0) {
      setIndex(0);
    }
  }, [index]);

  return (
    <Container>
      <div className='controls'>
        <Controls type='next' onClick={handleControls} currentIndex={index} />
        <Controls type='prev' onClick={handleControls} currentIndex={index} />
      </div>
      <Contents movies={data} index={index} />
    </Container>
  );
};

export default Carousel;
