import React from 'react';
import { FullStar, EmptyStar, HalfStar } from 'icons';

// REF: http://joshanthony.info/2018/06/11/star-rating-react/#rendering_stars_fa

const Rating: React.FC<{ vote: number }> = ({ vote }) => {
  const totalStars = () => {
    return Math.ceil(10 / 2);
  };

  const fullStars = () => {
    return Math.floor(vote / 2);
  };

  const halfStars = () => {
    let x = 5 % 2;
    let i = (1 / 2) * 2;
    return x >= i ? 1 : 0;
  };

  const emptyStars = () => {
    return totalStars() - fullStars() - halfStars();
  };

  const renderStars = ():
    | Array<React.ReactElement>
    | React.ReactElement
    | null => {
    const nFullStars: number = fullStars();
    const nHalfStars: number = halfStars();
    const nEmptyStars: number = emptyStars();
    let stars: Array<React.ReactElement> = [];
    const size: number = 20;

    if (nFullStars > 0) {
      for (let index = 0; index < nFullStars; index++) {
        stars.push(
          <span key={Math.random()}>
            <FullStar color='red' width={size} height={size} />
          </span>
        );
      }
    }

    if (nHalfStars > 0) {
      for (let index = 0; index < nHalfStars; index++) {
        stars.push(
          <span key={Math.random()}>
            <HalfStar color='red' width={size} height={size} />
          </span>
        );
      }
    }

    if (nEmptyStars > 0) {
      for (let index = 0; index < nEmptyStars; index++) {
        stars.push(
          <span key={Math.random()}>
            <EmptyStar color='red' width={size} height={size} />
          </span>
        );
      }
    }

    return stars;
  };

  return <>{renderStars()}</>;
};

export default Rating;
