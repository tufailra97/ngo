import React from 'react';
import styled from 'styled-components';
import { Subline } from 'elements/Typography';
import { ICast } from 'interfaces/MovieProps';
import { Carousel } from 'components';
import { Avatar } from 'icons';

const CastWrapper = styled.div`
  margin-bottom: 2rem;
  h2 {
    margin-bottom: 1rem;
  }
  .cast-img-container {
    display: flex;

    img {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      margin: 0 1rem;
    }
  }
`;

const Cast: React.FC<{ cast: Array<ICast>; callback: Function }> = ({
  cast,
  callback
}) => {
  const handleCast = ():
    | Array<React.ReactElement>
    | React.ReactElement
    | null => {
    let casts = [];
    let crews = cast;
    // limit cast to 20
    if (Array.isArray(crews)) {
      if (crews.length > 20) {
        crews = crews.slice(0, 20);
      }
      casts = crews.map(cast => {
        return (
          <div
            className='cast-img'
            key={cast.id}
            onClick={() => {
              callback(cast.id);
            }}
          >
            {cast.profile_path !== null ? (
              <img
                src={`https://image.tmdb.org/t/p/w780/${cast.profile_path}`}
              />
            ) : (
              <div style={{ margin: '0 1rem' }}>
                <Avatar width={50} height={50} color={'grey'} />
              </div>
            )}
          </div>
        );
      });
      return casts;
    }
    return null;
  };
  return (
    <CastWrapper>
      <Subline style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}>
        Cast
      </Subline>
      <div className='cast-img-container'>
        <Carousel translate={70}>{handleCast()}</Carousel>
      </div>
    </CastWrapper>
  );
};

export default Cast;
