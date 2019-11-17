import styled, { ThemeProps as StyleThemeProps } from 'styled-components';
import { ThemeProps } from 'interfaces';

export const Button = styled.button`
  padding: 1rem 3rem;
  border-radius: 2px;
  border: none;
  font-size: 1.4rem;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  border: 0.1rem solid
    ${(props: StyleThemeProps<ThemeProps>) => props.theme.textColour};
  background-color: ${(props: StyleThemeProps<ThemeProps>) =>
    props.theme.textColour};
  color: ${(props: StyleThemeProps<ThemeProps>) => props.theme.lightTextColour};
  transition: color 0.5s, background-color 0.5s;
  box-shadow: 0px 0px 11px -1px rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: transparent;
    color: ${(props: StyleThemeProps<ThemeProps>) => props.theme.textColour};
  }
`;
