import styled, { ThemeProps as StyleThemeProps } from 'styled-components';
import { ThemeProps } from 'interfaces';

export const Headline = styled.h1`
  color: ${(props: StyleThemeProps<ThemeProps>) => props.theme.textColour};
`;

export const Subline = styled.h2`
  color: ${(props: StyleThemeProps<ThemeProps>) => props.theme.textColour};
`;

export const Underline = styled.h3`
  color: ${(props: StyleThemeProps<ThemeProps>) => props.theme.textColour};
`;

export const Paragraph = styled.p`
  color: ${(props: StyleThemeProps<ThemeProps>) => props.theme.textColour};
`;
