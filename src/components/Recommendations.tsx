import React from 'react';
import styled from 'styled-components';

const RecommendationWrapper = styled.div`
  padding: 0 2.5%;
  margin: 4rem 0;
  margin-bottom: 1rem;
  h2 {
    font-size: 2rem;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
  .recommendation {
    width: 90.5%;
    display: flex;
    justify-content: space-between;
  }
`;

const Recommendation: React.FC = ({ children }) => {
  return <RecommendationWrapper>{children}</RecommendationWrapper>;
};

export default Recommendation;
