import React from 'react';
import { useSelector } from 'react-redux';

const Movies: React.FC = () => {
  const counter = useSelector((state: any) => state);
  console.log(counter);
  return <div>Movies</div>;
};

export default Movies;
