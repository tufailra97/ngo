import React from 'react';
import styled, { ThemeProps as StyleThemeProps } from 'styled-components';
import { ThemeProps } from 'interfaces';
import { ICardProps } from 'interfaces';

const CardStyle = styled.div`
  position: relative;
  width: 20%;
  margin: 2rem 0.5rem;
  flex-shrink: 0;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

    img {
    width: 100%;
    height: auto;
  }
`;
const Badge = styled.div`
  position: absolute;
  display: table;
  width: 3rem;
  height: 3rem;
  color: black;
  top: -10px;
  right: -10px;
  color: ${(props: StyleThemeProps<ThemeProps>) =>
    props.theme.secondaryTextColour};
  line-height: 3rem;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  background-color: ${(props: StyleThemeProps<ThemeProps>) =>
    props.theme.focus};
  border-radius: 25px;
`;

const Card: React.FC<ICardProps> = ({
  title,
  imageURL,
  voteAverage,
  showBadge,
  callback,
  id
}) => {
  const handleMovieInfo = (): void => {
    callback(id);
  };

  return (
    <CardStyle onClick={handleMovieInfo}>
      <img src={`https://image.tmdb.org/t/p/w780/${imageURL}`} />
      {showBadge ? <Badge>{voteAverage}</Badge> : null}
    </CardStyle>
  );
};
export default Card;
