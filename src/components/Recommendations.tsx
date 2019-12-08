import React from 'react';
import styled from 'styled-components';
import { ISerie, IMovie, IFavourite, IPeopleCredit } from 'interfaces';
import Card from './Card';
import { useHistory } from 'react-router-dom';

const RecommendationWrapper = styled.div`
  width: 107.5rem;
  margin: 0 auto;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
`;

interface IRecommendation {
  type: 'serie' | 'movie';
  series?: Array<ISerie | IFavourite | IPeopleCredit>;
  movies?: Array<IMovie | IFavourite | IPeopleCredit>;
  limit?: boolean;
}
const Recommendation: React.FC<IRecommendation> = ({
  series,
  movies,
  type,
  limit = true
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
    let data: Array<IMovie | ISerie | IFavourite | IPeopleCredit> =
      type === 'movie' ? movies! : series!;

    if (limit) {
      data = data.slice(0, 6);
    }

    const itemToRender: Array<React.ReactElement> = data.map(item => {
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

  return (
    <RecommendationWrapper
      style={{ justifyContent: `${limit ? 'space-evenly' : 'flex-start'}` }}
    >
      {movies || series ? renderItems() : null}
    </RecommendationWrapper>
  );
};

export default Recommendation;
