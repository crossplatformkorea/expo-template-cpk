import ErrorBoundary from 'react-native-error-boundary';
import FallbackComponent from 'react-native-error-boundary/lib/ErrorBoundary/FallbackComponent';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {CpkProvider, type ThemeType} from 'cpk-ui';

import {theme} from '../theme';
import {handleErrorConsole} from '../utils/error';

interface Props {
  initialThemeType?: ThemeType;
  children?: JSX.Element;
}

function RootProvider({initialThemeType, children}: Props): JSX.Element {
  return (
    <CpkProvider
      themeConfig={{
        initialThemeType: initialThemeType ?? undefined,
        customTheme: theme,
      }}
    >
      <ErrorBoundary
        FallbackComponent={FallbackComponent}
        onError={handleErrorConsole}
      >
        <ActionSheetProvider>{children}</ActionSheetProvider>
      </ErrorBoundary>
    </CpkProvider>
  );
}

export default RootProvider;
