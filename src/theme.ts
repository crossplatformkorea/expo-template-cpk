import {CpkThemeParams} from 'cpk-ui/utils/theme';

export const colors = {
  apple: '#000000',
  google: '#E04238',
  facebook: '#345997',
};

export const light: CpkThemeParams & any = {};

export type CustomAppTheme = typeof light & CpkThemeParams;

export const dark: CpkThemeParams & typeof light = {};

export const theme = {
  light,
  dark,
};
