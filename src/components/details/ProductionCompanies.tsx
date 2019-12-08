import React, { ReactElement } from 'react';
import { ProctionCompanyProps } from 'interfaces';
import styled from 'styled-components';
import { H2 } from 'elements/Typography';

const ProctionCompanyWrapper = styled.div`
  .company-wrapper {
    display: flex;
    align-items: center;
    margin-top: 1rem;

    img {
      margin-right: 2rem;
      max-width: 6rem;
      height: auto;
      transition: transform 1s ease;
      &:hover {
        transform: scale(2);
      }
    }
  }
`;

interface IProductionCompanies {
  companies: Array<ProctionCompanyProps>;
}

const ProductionCompanies: React.FC<IProductionCompanies> = ({ companies }) => {
  const renderCompanies = ():
    | Array<React.ReactElement>
    | React.ReactElement => {
    let hasCompanies = false;
    let _companies: Array<ReactElement> = [];

    companies.forEach(company => {
      if (company.logo_path) {
        hasCompanies = true;
        _companies.push(
          <img
            key={company.id}
            src={`https://image.tmdb.org/t/p/w780/${company.logo_path}`}
            alt={company.name}
          />
        );
      }
    });

    return hasCompanies ? (
      _companies.length > 4 ? (
        _companies.slice(0, 4)
      ) : (
        _companies
      )
    ) : (
      <p className='paragraph desc-item read-more'>
        No Production Company was found
      </p>
    );
  };
  return (
    <ProctionCompanyWrapper>
      <H2 style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}>
        Production Companies
      </H2>
      <div className='company-wrapper'>{renderCompanies()}</div>
    </ProctionCompanyWrapper>
  );
};

export default ProductionCompanies;
