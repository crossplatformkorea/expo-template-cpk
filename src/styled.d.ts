import type {CpkThemeBase} from 'cpk-ui/utils/theme';
import type {CustomAppTheme} from './theme';

type AllTheme = CustomAppTheme & CpkThemeBase;

declare module 'kstyled' {
  interface DefaultTheme {
    bg: AllTheme['bg'];
    role: AllTheme['role'];
    text: AllTheme['text'];
    button: AllTheme['button'];
    isPortrait?: boolean;
    isDesktop?: boolean;
    isTablet?: boolean;
    isMobile?: boolean;
  }
}
