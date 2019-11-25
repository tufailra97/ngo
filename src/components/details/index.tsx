import React, { useState, useContext } from 'react';
import { ICast, TrailerResponse, ProctionCompanyProps } from 'interfaces';
import { Subline } from 'elements/Typography';
import Title from './Title';
import styled, {
  ThemeProps as StyledThemeProps,
  ThemeContext
} from 'styled-components';
import Genres from './Genres';
import BasicInfo from './BasicInfo';
import Cast from './Cast';
import ReadMore from 'components/ReadMore';
import PlayButton from 'icons/PlayButton';
import Modal from 'components/Modal';
import axios from 'axios';
import ThemeProps from 'interfaces/ThemeProps';
import ProductionCompanies from './ProductionCompanies';

// TODO: simplify and improve the component

const DetailsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 3rem;
  .image-container {
    flex-shrink: 0;
    width: 20vw;
    height: auto;
    margin-right: 3rem;
    position: relative;

    .trailer {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.9;
      transform-origin: center;
      transition: transform 0.5s ease;
      cursor: pointer;
      &:hover {
        transform: scale(1.25);
      }
      & > div {
        box-shadow: 0px 0px 29px 4px rgba(0, 0, 0, 0.71);
        padding: 1.5rem;
        border: 0.5rem solid
          ${(props: StyledThemeProps<ThemeProps>) =>
            props.theme.secondaryTextColour};
        border-radius: 50%;
      }
    }
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

    .description {
      p {
        text-align: justify;
        line-height: 2.3rem;
      }
    }
  }
`;

interface IDetails {
  id: number;
  type: 'movie' | 'tv';
  title: string;
  poster: string;
  vote: number;
  tagline?: string;
  releaseDate: string;
  runtime?: string | number;
  seasonNumber?: number;
  overview: string;
  totalSeason?: number;
  totalEpisodes?: number;
  productionCompanies: Array<ProctionCompanyProps>;
  genres: Array<{ id: number; name: string }>;
  cast: Array<ICast>;
  callback: Function;
}

const Details: React.FC<IDetails> = ({
  id,
  type,
  title,
  poster,
  vote,
  cast,
  callback,
  genres,
  tagline,
  releaseDate,
  runtime,
  overview,
  productionCompanies,
  totalSeason,
  totalEpisodes
}) => {
  const [showModal, setModalStatus] = useState(false);
  const [traileURL, setTraileURL] = useState('');
  const theme: ThemeProps = useContext(ThemeContext);

  const handleCloseModal = () => {
    setModalStatus(false);
  };

  const handleTrailer = async () => {
    setModalStatus(true);
    setTraileURL(await getTrailer());
  };

  const getTrailer = async (): Promise<string> => {
    const mediaType = type === 'movie' ? 'movie' : 'tv';
    let trailerURL: string = '';
    const request = await axios.get(
      `${process.env.REACT_APP_TMDB_END_POINT}/${mediaType}/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API}`
    );

    const response: TrailerResponse = request.data;

    response.results.forEach(t => {
      if (t.type === 'Trailer') {
        trailerURL = `https://www.youtube.com/embed/${t.key}?autoplay=1`;
      }
    });

    return trailerURL;
  };

  return (
    <DetailsWrapper>
      <div className='image-container'>
        <img src={`https://image.tmdb.org/t/p/w780/${poster}`} alt={title} />
        <div className='trailer' onClick={handleTrailer}>
          <div>
            <PlayButton
              width={50}
              height={50}
              color={theme.secondaryTextColour}
            />
          </div>
        </div>
      </div>
      <div className='details-container'>
        {/* title */}
        <Title title={title} tagline={tagline} />
        <div className='info'>
          <BasicInfo
            vote={vote}
            type={type}
            runtime={runtime ? runtime.toString() : 'N/A'}
            releaseDate={releaseDate}
            totalSeason={totalSeason}
            totalEpisodes={totalEpisodes}
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
            <Genres genres={genres} />
          </div>
          {/* description */}
          <div className='description info-container'>
            <Subline style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}>
              Description
            </Subline>
            <div className='description'>
              <ReadMore
                texts={overview}
                maxLine={3}
                lineHeight={23}
                classNames={'paragraph desc-item'}
              />
            </div>
          </div>
          {/* cast */}
          <Cast cast={cast} callback={callback} />
          {/* production company */}
          <ProductionCompanies companies={productionCompanies} />
        </div>
      </div>
      <Modal
        showModal={showModal}
        trailerURL={traileURL}
        onClose={handleCloseModal}
      />
    </DetailsWrapper>
  );
};

export default Details;
