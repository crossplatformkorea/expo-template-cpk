import type React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import FallbackComponent from 'react-native-error-boundary/lib/ErrorBoundary/FallbackComponent';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {CpkProvider} from 'cpk-ui';

import {theme} from '../../theme';
import {handleErrorConsole} from '../../utils/error';

interface Props {
  initialThemeType?: 'light' | 'dark';
  children?: React.ReactElement;
}

function RootProvider({initialThemeType, children}: Props): React.ReactElement {
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
