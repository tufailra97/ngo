import React from 'react';
import styled from 'styled-components';
import { ICardProps } from 'interfaces';

const CardStyle = styled.div`
  position: relative;
  width: 20%;
  margin: 1rem 0.5rem;
  flex-shrink: 0;
    img {
    width: 100%;
    height: auto;
  }
`;
const Badge = styled.div`
  position: absolute;
  top: 0;
  margin: 0 auto;
  background-color: red;
  display: table;
  padding: 15px;
  border-radius: 25px;
`;

const Card: React.FC<ICardProps> = ({
  title,
  description,
  imageURL,
  voteAverage,
  showBadge
}) => {
  return (
    <CardStyle>
      <img src={`https://image.tmdb.org/t/p/w780/${imageURL}`} />
      <h3>{title}</h3>
      {showBadge ? <Badge>{voteAverage}</Badge> : null}
    </CardStyle>
  );
};
export default Card;
