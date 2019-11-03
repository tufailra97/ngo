import React from 'react';
import { IMovieDetails } from 'interfaces';
import { ICast } from 'interfaces/MovieProps';
import { Subline, Paragraph } from 'elements/Typography';
import Title from './Title';
import styled from 'styled-components';
import Genres from './Genres';
import BasicInfo from './BasicInfo';

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

      .company-item {
        margin-right: 2rem;
        img {
          max-width: 6rem;
          height: auto;
          transition: transform 1s ease;
          &:hover {
            transform: scale(2);
          }
        }
      }
    }

    .description {
      p {
        text-align: justify;
        line-height: 2.3rem;
      }
    }
    /* cast images */
    .cast-img {
      width: 4rem;
      height: 4rem;
      display: flex;

      img {
        border-radius: 50%;
        width: 4rem;
        height: 4rem;
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
  const handleCast = ():
    | Array<React.ReactElement>
    | React.ReactElement
    | null => {
    let casts = [];
    let crews = cast;
    if (Array.isArray(crews)) {
      if (crews.length > 20) {
        crews = crews.slice(0, 10);
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
            <img src={`https://image.tmdb.org/t/p/w780/${cast.profile_path}`} />
          </div>
        );
      });
      return casts;
    }
    return null;
  };

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
            runtime={movie.runtime.toString()}
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
          <div className='casts casts-container info-container'>
            <Subline style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}>
              Cast
            </Subline>
            <div className='cast-img'>{handleCast()}</div>
          </div>
          {/* production company */}
          <div className='production-companies info-container'>
            <Subline style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}>
              Production Companies
            </Subline>
            <Paragraph className='paragraph desc-item company-wrapper'>
              {movie.production_companies.map(company => {
                if (company.logo_path) {
                  return (
                    <span className='company-item' key={company.id}>
                      <img
                        src={`https://image.tmdb.org/t/p/w780/${company.logo_path}`}
                        alt={company.name}
                      />
                    </span>
                  );
                }
              })}
            </Paragraph>
          </div>
        </div>
      </div>
    </DetailsWrapper>
  );
};

export default Details;
