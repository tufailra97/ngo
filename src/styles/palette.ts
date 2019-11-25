import { ThemeProps } from 'interfaces';

export const light: ThemeProps = {
  textColour: 'rgba(20, 19, 13, 1)',
  lightTextColour: 'rgba(255,255,255,1)',
  secondaryTextColour: 'rgba(54, 56, 59, 1)',
  primaryBackgroundColour: 'rgba(210, 213, 215, 1)',
  secondaryBackgroundColour: 'rgba(238, 239, 240, 1)',
  focus: 'rgba(255, 195, 0, 1)',
  colour2: 'rgba(255, 87, 51, 1)',
  lightBackground: '',
  darkBackground: 'rgba(11, 13, 50, 1)'
};

export const dark: ThemeProps = {
  textColour: 'rgba(210, 213, 215, 1)',
  lightTextColour: 'rgba(255,255,255,1)',
  secondaryTextColour: '',
  primaryBackgroundColour: 'rgba(81, 87, 90, 1)',
  secondaryBackgroundColour: 'rgba(20, 19, 13, 1)',
  colour2: 'rgba(255, 87, 51, 1)',
  focus: 'rgba(244, 72, 41, 1)',
  lightBackground: '',
  darkBackground: 'rgba(11, 13, 50, 1)'
};
