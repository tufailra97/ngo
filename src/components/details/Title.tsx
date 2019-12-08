import React from 'react';
import styled, { ThemeProps as StyleThemeProps } from 'styled-components';
import { H1, H2 } from 'elements/Typography';
import ThemeProps from 'interfaces/ThemeProps';

interface ITitle {
  title: string;
  tagline?: string;
}

const TitleWrapper = styled.div`
  margin-bottom: 2rem;
  h1,
  h2 {
    max-width: 40rem;
  }

  h1 {
    margin-bottom: 1rem;
    color: ${(props: StyleThemeProps<ThemeProps>) => props.theme.textColour};
  }
  h2 {
    color: ${(props: StyleThemeProps<ThemeProps>) =>
      props.theme.secondaryTextColour};
  }
`;

const Title: React.FC<ITitle> = ({ title, tagline }) => {
  return (
    <TitleWrapper>
      <H1
        style={{
          fontWeight: 400,
          maxWidth: '40rem',
          fontSize: '3.5rem',
          textTransform: 'uppercase'
        }}
      >
        {title}
      </H1>
      {tagline && (
        <H2
          style={{
            fontWeight: 600,
            maxWidth: '40rem',
            fontSize: '1.5rem',
            letterSpacing: 1,
            textTransform: 'uppercase'
          }}
        >
          {tagline}
        </H2>
      )}
    </TitleWrapper>
  );
};

export default Title;
