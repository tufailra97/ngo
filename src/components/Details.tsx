import React from 'react';
import { IMovieDetails } from 'interfaces';
import { ICast } from 'interfaces/MovieProps';
import { Headline, Subline, Paragraph } from 'elements/Typography';
import styled from 'styled-components';
import Genres from './details/Genres';
import Rating from './Rating';

const DetailsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  .image-container {
    flex-shrink: 0;
    width: 20vw;
    height: auto;
    margin-right: 1rem;
    img {
      width: 100%;
      height: auto;
    }
  }

  .details-container {
    margin-left: 1rem;
    width: 40vw;

    .headline {
      margin-bottom: 2rem;
      h1,
      h2 {
        max-width: 40rem;
      }

      h1 {
        margin-bottom: 1rem;
      }
    }

    .paragraph {
      font-size: 1.3rem;
      line-height: 1.4;
    }

    .info-container {
      margin-bottom: 1rem;
      h2 {
        margin-bottom: 0.5rem;
      }

      .basic-info {
        display: flex;
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
        <div className='headline'>
          <Headline
            style={{
              fontWeight: 400,
              maxWidth: '40rem',
              fontSize: '3.5rem',
              textTransform: 'uppercase'
            }}
          >
            {movie.original_title}
          </Headline>
          {movie.tagline && (
            <Subline
              style={{
                fontWeight: 600,
                maxWidth: '40rem',
                fontSize: '1.5rem',
                letterSpacing: 1,
                textTransform: 'uppercase'
              }}
            >
              {movie.tagline}
            </Subline>
          )}
        </div>
        <div className='info'>
          <div className='basic-info'>
            {/* rating */}
            <div className='rating info-container'>
              <Subline
                style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}
              >
                Vote
              </Subline>
              <Paragraph className='paragraph desc-item'>
                {movie.vote_average}
                {<Rating vote={movie.vote_average!} />}
              </Paragraph>
            </div>
            {/* release date */}
            <div className='release-date info-container'>
              <Subline
                style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}
              >
                Release Date
              </Subline>
              <Paragraph className='paragraph desc-item'>
                {movie.release_date}
              </Paragraph>
            </div>
            <div className='run-time info-container'>
              <Subline
                style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}
              >
                Runtime
              </Subline>
              <Paragraph className='paragraph desc-item'>
                {movie.runtime}min
              </Paragraph>
            </div>
          </div>
          <div className='genres info-container'>
            <Subline style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}>
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
          {/* production company */}
          <div className='production-companies info-container'>
            <Subline style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}>
              Production Companies
            </Subline>
            <Paragraph className='paragraph desc-item'>
              {movie.production_companies.map(company => {
                return <span key={company.id}>{company.name}</span>;
              })}
            </Paragraph>
          </div>
          {/* cast */}
          <div className='casts info-container'>
            <Subline style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}>
              Cast
            </Subline>
            <div className='cast-img'>{handleCast()}</div>
          </div>
        </div>
      </div>
    </DetailsWrapper>
  );
};

export default Details;
