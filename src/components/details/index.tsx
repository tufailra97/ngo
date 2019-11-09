import React from 'react';
import { IMovieDetails } from 'interfaces';
import { ICast } from 'interfaces/MovieProps';
import { Subline, Paragraph } from 'elements/Typography';
import Title from './Title';
import styled from 'styled-components';
import Genres from './Genres';
import BasicInfo from './BasicInfo';
import Cast from './Cast';

// TODO: simplify and improve the component

const DetailsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  .image-container {
    flex-shrink: 0;
    width: 20vw;
    height: auto;
    margin-right: 3rem;
    img {
      width: 100%;
      height: auto;
      box-shadow: 0px 0px 29px 4px rgba(0, 0, 0, 0.29);
    }
  }

  .details-container {
    width: 55%;
    margin-left: 3rem;

    .paragraph {
      font-size: 1.3rem;
      line-height: 1.4;
    }

    .info-container {
      margin-bottom: 2rem;
      h2 {
        margin-bottom: 1rem;
      }
    }

    .company-wrapper {
      display: flex;
      align-items: center;

      img {
        margin-right: 2rem;
        max-width: 6rem;
        height: auto;
        transition: transform 1s ease;
        &:hover {
          transform: scale(2);
        }
      }
    }

    .description {
      p {
        text-align: justify;
        line-height: 2.3rem;
      }
    }
  }
`;

interface IDetails {
  movie: IMovieDetails;
  cast: Array<ICast>;
  callback: Function;
}

const Details: React.FC<IDetails> = ({ movie, cast, callback }) => {
  return (
    <DetailsWrapper>
      <div className='image-container'>
        <img src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} />
      </div>
      <div className='details-container'>
        {/* title */}
        <Title title={movie.title} tagline={movie.tagline} />
        <div className='info'>
          <BasicInfo
            vote={movie.vote_average!}
            runtime={movie.runtime ? movie.runtime.toString() : 'N/A'}
            releaseDate={movie.release_date!}
          />
          <div className='genres info-container'>
            <Subline
              style={{
                fontSize: '1.3rem',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              Genres
            </Subline>
            <Genres genres={movie.genres!} />
          </div>
          {/* description */}
          <div className='description info-container'>
            <Subline style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}>
              Description
            </Subline>
            <div className='description'>
              <Paragraph className='paragraph desc-item'>
                {movie.overview}
              </Paragraph>
            </div>
          </div>
          {/* cast */}
          <Cast cast={cast} callback={callback} />
          {/* production company */}
          <div className='production-companies info-container'>
            <Subline style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}>
              Production Companies
            </Subline>
            <div className='desc-item company-wrapper'>
              {movie.production_companies.map(company => {
                if (company.logo_path) {
                  return (
                    <img
                      key={company.id}
                      src={`https://image.tmdb.org/t/p/w780/${company.logo_path}`}
                      alt={company.name}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </DetailsWrapper>
  );
};

export default Details;
