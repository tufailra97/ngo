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
    box-shadow: 0px 0px 29px 4px rgba(0, 0, 0, 0.29);
  }
`;
const Badge = styled.div`
  position: absolute;
  display: table;
  width: 5rem;
  height: 3rem;
  color: black;
  top: 2rem;
  right: -1rem;
  color: ${(props: StyleThemeProps<ThemeProps>) =>
    props.theme.secondaryTextColour};
  line-height: 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  background-color: ${(props: StyleThemeProps<ThemeProps>) =>
    props.theme.focus};
  border-radius: 2px;
`;

const Card: React.FC<ICardProps> = ({
  imageURL,
  voteAverage,
  showBadge,
  callback,
  id,
  style,
  className
}) => {
  const handleMovieInfo = (): void => {
    callback(id);
  };

  return (
    <CardStyle onClick={handleMovieInfo} style={style} className={className}>
      <img src={`https://image.tmdb.org/t/p/w780/${imageURL}`} />
      {showBadge ? <Badge>{voteAverage}</Badge> : null}
    </CardStyle>
  );
};
export default Card;
