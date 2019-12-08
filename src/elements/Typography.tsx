import styled, { ThemeProps as StyleThemeProps } from 'styled-components';
import { ThemeProps } from 'interfaces';

export const Headline = styled.h1`
  font-size: 3.5rem;
  font-weight: 400;
  color: ${(props: StyleThemeProps<ThemeProps>) => props.theme.textColour};
`;

export const Subline = styled.h2`
  font-size: 1.5rem;
  color: ${(props: StyleThemeProps<ThemeProps>) => props.theme.textColour};
`;

export const Underline = styled.h3`
  color: ${(props: StyleThemeProps<ThemeProps>) => props.theme.textColour};
`;

export const Paragraph = styled.p`
  font-size: 1.4rem;
  color: ${(props: StyleThemeProps<ThemeProps>) => props.theme.textColour};
`;
