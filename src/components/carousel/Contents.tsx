import React, { useRef } from 'react';
import styled, { ThemeProps as StyledThemeProps } from 'styled-components';
import { IMovie, TrailerResponse, ThemeProps } from 'interfaces';
import { Headline } from 'elements/Typography';
import { useHistory } from 'react-router-dom';
import Rating from 'components/Rating';
import ReadMore from 'components/ReadMore';
import { ArrowFull, Info } from 'icons';
import { Button } from 'elements';
import axios from 'axios';

const ContentsWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  flex-shrink: 0;
  width: 100%;
`;

const ContentItem = styled.div`
  position: relative;
  width: 100%;
  height: 36.3rem;
  display: flex;

  flex-shrink: 0;
  img {
    width: auto;
    height: 36.3rem;
  }

  .desc {
    padding: 2rem;
    width: 100%;
    background-color: ${(props: StyledThemeProps<ThemeProps>) =>
      props.theme.primaryBackgroundColour};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h1 {
      font-size: 2.5em;
      font-weight: 400;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }

    .paragraph {
      font-size: 1.4rem;
      line-height: 2rem;
      text-align: justify;
      margin-top: 1rem;
    }
  }

  .footer {
    display: flex;
    justify-content: flex-start;

    button {
      &:first-child {
        margin-right: 3rem;
      }
    }
  }
`;

const Contents: React.FC<{
  movie: IMovie;
  index: number;
  modalStatus: Function;
}> = ({ movie, index, modalStatus }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  const handleItemDetails = (id: number) => {
    history.push({
      pathname: `/movies/details/${id}`
    });
  };

  const handleTrailer = async () => {
    modalStatus(await getTrailer());
  };

  const getTrailer = async (): Promise<string> => {
    let trailerURL: string = '';
    const request = await axios.get(
      `${process.env.REACT_APP_TMDB_END_POINT}/movie/${movie.id}/videos?api_key=${process.env.REACT_APP_TMDB_API}`
    );

    const response: TrailerResponse = request.data;

    response.results.map(t => {
      if (t.type === 'Trailer') {
        trailerURL = `https://www.youtube.com/embed/${t.key}?autoplay=1`;
      }
    });

    return trailerURL;
  };

  return (
    <ContentsWrapper
      style={{ transform: `translateX(-${index * 100}%)` }}
      ref={containerRef}
    >
      <ContentItem key={movie.id} className='content-item'>
        <div className='image-container'>
          <img
            src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
            alt={movie.title}
          />
        </div>
        <div className='desc'>
          <div className='info'>
            <Headline>{movie.title}</Headline>
            <Rating vote={movie.vote_average!} />
            <ReadMore
              maxLine={4}
              lineHeight={20}
              texts={movie.overview!}
              classNames='paragraph'
            />
          </div>
          <div className='footer'>
            <Button
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem'
              }}
              onClick={handleTrailer}
            >
              <ArrowFull color={'white'} width={20} height={20} />
              <span style={{ marginLeft: '1rem' }}>Trailer</span>
            </Button>
            <Button
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem'
              }}
              onClick={() => handleItemDetails(movie.id)}
            >
              <Info color={'white'} width={20} height={20} />
              <span style={{ marginLeft: '1rem' }}>details</span>
            </Button>
          </div>
        </div>
      </ContentItem>
    </ContentsWrapper>
  );
};

export default Contents;
