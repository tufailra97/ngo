import React from 'react';
import Rating from '../Rating';
import styled, { ThemeProps as StyleThemeProps } from 'styled-components';
import { Paragraph } from 'elements/Typography';
import ThemeProps from 'interfaces/ThemeProps';

interface IBasicInfo {
  vote: number;
  releaseDate: string;
  runtime: string;
}

const BasicInfoWrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .rate {
    display: flex;
    align-items: center;

    .vote {
      margin-left: 1rem;
      margin-top: -0.1rem;
      font-size: 1.3rem;
      font-weight: 600;
      color: ${(props: StyleThemeProps<ThemeProps>) => props.theme.textColour};
    }
  }
  .release-wrapper {
    font-weight: 600;

    p {
      span {
        color: ${(props: StyleThemeProps<ThemeProps>) =>
          props.theme.secondaryTextColour};
        font-size: 1.3rem;
      }
    }
  }
`;

const BasicInfo: React.FC<IBasicInfo> = ({ vote, releaseDate, runtime }) => {
  const year = new Date(releaseDate).getFullYear();

  return (
    <BasicInfoWrapper>
      {/* rating */}
      <div className='rating-wrapper'>
        <Paragraph className='rate'>
          {<Rating vote={vote} />}
          <span className='vote'> {vote}</span>
        </Paragraph>
      </div>
      <div className='release-wrapper'>
        <p>
          <span>{runtime} MIN.</span> / <span>{year}</span>
        </p>
      </div>
    </BasicInfoWrapper>
  );
};

export default BasicInfo;
