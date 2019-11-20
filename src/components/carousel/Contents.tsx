import React, { useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { ThemeProps, IMovie } from 'interfaces';

const ContentsWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const ContentItem = styled.div`
  width: 100%;
  flex-shrink: 0;
  img {
    width: 100%;
    position: absolute;
  }
`;

const Contents: React.FC<{ movies: Array<IMovie>; index: number }> = ({
  movies,
  index
}) => {
  const theme: ThemeProps = useContext(ThemeContext);
  const containerRef = useRef<HTMLDivElement>(null);

  const renderItem = (): Array<React.ReactElement> => {
    let contents: Array<React.ReactElement> = [];

    contents = movies.map(movie => {
      return (
        <ContentItem key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
            alt={movie.title}
          />
          <div>{movie.title}</div>
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
