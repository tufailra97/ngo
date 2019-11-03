import React from 'react';
import styled, { ThemeProps as StyleThemeProps } from 'styled-components';
import { ThemeProps } from 'interfaces';

interface IGenres {
  genres: Array<{ id: number; name: string }>;
}

const genresList = [
  {
    id: 28,
    name: 'Action'
  },
  {
    id: 12,
    name: 'Adventure'
  },
  {
    id: 16,
    name: 'Animation'
  },
  {
    id: 35,
    name: 'Comedy'
  },
  {
    id: 80,
    name: 'Crime'
  },
  {
    id: 99,
    name: 'Documentary'
  },
  {
    id: 18,
    name: 'Drama'
  },
  {
    id: 10751,
    name: 'Family'
  },
  {
    id: 14,
    name: 'Fantasy'
  },
  {
    id: 36,
    name: 'History'
  },
  {
    id: 27,
    name: 'Horror'
  },
  {
    id: 10402,
    name: 'Music'
  },
  {
    id: 9648,
    name: 'Mystery'
  },
  {
    id: 10749,
    name: 'Romance'
  },
  {
    id: 878,
    name: 'Science Fiction'
  },
  {
    id: 10770,
    name: 'TV Movie'
  },
  {
    id: 53,
    name: 'Thriller'
  },
  {
    id: 10752,
    name: 'War'
  },
  {
    id: 37,
    name: 'Western'
  }
];

const GenresWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: center;

  span {
    text-transform: uppercase;
    color: ${(props: StyleThemeProps<ThemeProps>) =>
      props.theme.secondaryTextColour};
    margin-right: 0.5rem;
    font-weight: 600;
  }
`;

const Genres: React.FC<IGenres> = ({ genres }) => {
  const getGenresToDisplay = (): Array<{ id: number; name: string }> => {
    const genresToDisplay: Array<{ id: number; name: string }> = [];
    genres.forEach(genre => {
      genresList.forEach(genreFromList => {
        if (genre.id === genreFromList.id) {
          genresToDisplay.push(genre);
        }
      });
    });

    return genresToDisplay;
  };

  const handleDisplayGenres = ():
    | Array<React.ReactElement>
    | React.ReactElement
    | null => {
    const genres = getGenresToDisplay().map(genre => {
      return (
        <span className='genre-item' key={genre.id}>
          {genre.name}
        </span>
      );
    });

    return genres;
  };

  return <GenresWrapper>{handleDisplayGenres()}</GenresWrapper>;
};

export default Genres;
