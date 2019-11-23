import React, { useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { ThemeProps, IMovie } from 'interfaces';
import { Headline } from 'elements/Typography';
import { useHistory } from 'react-router-dom';
import Rating from 'components/Rating';
import ReadMore from 'components/ReadMore';
import { ArrowFull, Info } from 'icons';
import { Button } from 'elements';

const ContentsWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease;
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
    background-color: #eeefef;
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
      &:last-child {
        margin-left: 3rem;
      }
    }
  }
`;

const Contents: React.FC<{
  movies: Array<IMovie>;
  index: number;
  modelStatus: Function;
}> = ({ movies, index, modelStatus }) => {
  const theme: ThemeProps = useContext(ThemeContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  const handleItemDetails = (id: number) => {
    history.push({
      pathname: `/movies/details/${id}`
    });
  };

  const handleTrailer = (id: number) => {
    modelStatus(id);
  };

  const renderItem = (): Array<React.ReactElement> => {
    let contents: Array<React.ReactElement> = [];

    contents = movies.map(movie => {
      return (
        <ContentItem key={movie.id}>
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
                maxLine={2}
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
                onClick={() => handleTrailer(movie.id)}
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
      );
    });

    return contents;
  };
  return (
    <div style={{ overflow: 'hidden' }}>
      <ContentsWrapper
        style={{ transform: `translateX(-${index * 100}%)` }}
        ref={containerRef}
      >
        {renderItem()}
      </ContentsWrapper>
    </div>
  );
};

export default Contents;
