import React from 'react';
import styled, { ThemeProps as StyleThemeProps } from 'styled-components';
import { H1, H2, H3 } from 'elements/Typography';
import ThemeProps from 'interfaces/ThemeProps';

interface ITitle {
  title: string;
  tagline?: string;
}

const TitleWrapper = styled.div`
  margin-bottom: 2rem;
  h1,
  h3 {
    max-width: 40rem;
    text-transform: uppercase;
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
      <H1>{title}</H1>
      {tagline && <H3>{tagline}</H3>}
    </TitleWrapper>
  );
};

export default Title;
