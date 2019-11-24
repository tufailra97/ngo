import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Controls from './Controls';
import Contents from './Contents';
import { IMovie } from 'interfaces';
import Modal from 'components/Modal';

const Container = styled.div`
  position: relative;
  display: flex;
  width: 93%;
  margin: 0 auto;
`;

const CarouselItem = styled.div`
  display: flex;
  overflow: hidden;
`;

const Carousel: React.FC<{ data: Array<IMovie> }> = ({ data }) => {
  const [index, setIndex] = useState(0);
  const [modalStatus, setModalStatus] = useState(false);
  const [trailerLink, setTrailerLink] = useState('');

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

  const handleModal = () => {
    setModalStatus(!modalStatus);
  };

  const handleTrailerLink = (link: string) => {
    console.log('link', link);

    setTrailerLink(link);
    setModalStatus(true);
  };

  return (
    <Container>
      <div className='controls'>
        <Controls type='next' onClick={handleControls} currentIndex={index} />
        <Controls type='prev' onClick={handleControls} currentIndex={index} />
      </div>
      <CarouselItem>
        {data.map(movie => {
          return (
            <Contents
              key={movie.id}
              movie={movie}
              index={index}
              modalStatus={handleTrailerLink}
            />
          );
        })}
      </CarouselItem>
      <Modal
        showModal={modalStatus}
        trailerURL={trailerLink}
        onClose={handleModal}
      />
    </Container>
  );
};

export default Carousel;
