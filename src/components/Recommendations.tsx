import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { ISerie, IMovie } from 'interfaces';
import Card from './Card';
import { useHistory } from 'react-router-dom';

const RecommendationWrapper = styled.div`
  width: 107.5rem;
  margin: 0 auto;
  margin-bottom: 1rem;

  display: flex;
  justify-content: space-evenly;
  .card {
  }
`;

interface IRecommendation {
  type: 'serie' | 'movie';
  series?: Array<ISerie>;
  movies?: Array<IMovie>;
}
const Recommendation: React.FC<IRecommendation> = ({
  series,
  movies,
  type
}) => {
  const history = useHistory();

  const handleCallBack = (id: number) => {
    if (type === 'movie') {
      history.push({
        pathname: `/movies/details/${id}`
      });
    } else {
      history.push({
        pathname: `/series/details/${id}`
      });
    }
  };

  const renderItems = (): Array<React.ReactElement> => {
    const data: Array<IMovie | ISerie> = type === 'movie' ? movies! : series!;

    const itemToRender: Array<React.ReactElement> = data
      .slice(0, 6)
      .map(item => {
        return (
          <Card
            className='card'
            style={{ width: '15%' }}
            title={item.original_title}
            imageURL={item.poster_path!}
            key={item.id}
            id={item.id}
            callback={() => handleCallBack(item.id)}
          />
        );
      });
    return itemToRender;
  };

  return <RecommendationWrapper>{renderItems()}</RecommendationWrapper>;
};

export default Recommendation;
