import styled, { ThemeProps as StyleThemeProps } from 'styled-components';
import { ThemeProps } from 'interfaces';

export const H1 = styled.h1`
  font-size: 3.5rem;
  font-weight: 400;
  color: ${(props: StyleThemeProps<ThemeProps>) => props.theme.textColour};
`;

export const H2 = styled.h2`
  font-size: 2rem;
  color: ${(props: StyleThemeProps<ThemeProps>) => props.theme.textColour};
`;

export const H3 = styled.h3`
  font-size: 1.4rem;
  color: ${(props: StyleThemeProps<ThemeProps>) => props.theme.textColour};
`;

export const Paragraph = styled.p`
  font-size: 1.4rem;
  color: ${(props: StyleThemeProps<ThemeProps>) => props.theme.textColour};
`;
