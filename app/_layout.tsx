import {useEffect, useState} from 'react';
import type {ColorSchemeName} from 'react-native';
import {ActivityIndicator, Platform, useColorScheme, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import styled, {css} from '@emotion/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Stack, useRouter} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import RootProvider from '../src/providers';
import {
  AsyncStorageKey,
  COMPONENT_WIDTH,
  delayPressIn,
  WEB_URL,
} from '../src/utils/constants';
import {CustomPressable, Icon, useCPK} from 'cpk-ui';
import StatusBarBrightness from 'cpk-ui/components/uis/StatusbarBrightness/StatusBarBrightness';

// SplashScreen.preventAutoHideAsync();
SplashScreen.hideAsync();

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}) => theme.bg.paper};
  background-color: red;
`;

const Content = styled.View`
  align-self: center;
  width: 100%;
  flex: 1;
  max-width: ${COMPONENT_WIDTH + 'px'};
  background-color: ${({theme}) => theme.bg.basic};
`;

function Layout(): JSX.Element | null {
  const {assetLoaded, theme} = useCPK();
  const {back, replace} = useRouter();

  useEffect(() => {
    if (assetLoaded) {
      SplashScreen.hideAsync();
    }
  }, [assetLoaded]);

  if (!assetLoaded) {
    return null;
  }

  return (
    <Container>
      <Content>
        <Stack
          screenOptions={{
            headerStyle: {backgroundColor: theme.bg.basic},
            headerTintColor: theme.text.label,
            headerTitleStyle: {
              fontWeight: 'bold',
              color: theme.text.basic,
            },
            headerLeft: ({canGoBack}) =>
              canGoBack && (
                <CustomPressable
                  delayHoverIn={delayPressIn}
                  hitSlop={{top: 8, left: 8, right: 8, bottom: 8}}
                  onPress={() =>
                    canGoBack
                      ? back()
                      : Platform.OS === 'web'
                        ? (window.location.href = WEB_URL)
                        : replace('/')
                  }
                  style={
                    Platform.OS === 'web'
                      ? css`
                          padding: 8px;
                          border-radius: 48px;
                        `
                      : css`
                          padding: 8px;
                          border-radius: 48px;
                          margin-left: -8px;
                        `
                  }
                >
                  <Icon name="CaretLeft" size={24} />
                </CustomPressable>
              ),
          }}
        >
          {/* Note: Only modals are written here.  */}
        </Stack>
      </Content>
    </Container>
  );
}

export default function RootLayout(): JSX.Element | null {
  const colorScheme = useColorScheme();
  const [localThemeType, setLocalThemeType] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const initializeThemeType = async (): Promise<void> => {
      const darkMode = await AsyncStorage.getItem(AsyncStorageKey.DarkMode);

      const isDarkMode = !darkMode
        ? colorScheme === 'dark'
        : darkMode === 'true';

      // Suddenly not working 🤔
      // SystemUI.setBackgroundColorAsync(
      //   isDarkMode ? dark.bg.basic : light.bg.basic,
      // );

      setLocalThemeType(isDarkMode ? 'dark' : 'light');
    };

    initializeThemeType();
  }, [colorScheme]);

  if (!localThemeType) {
    const bgColor = colorScheme === 'dark' ? 'black' : 'white';
    const textColor = colorScheme === 'dark' ? 'white' : 'black';

    return (
      <View
        style={css`
          flex: 1;
          align-items: center;
          justify-content: center;
          background-color: ${bgColor};
        `}
      >
        <ActivityIndicator color={textColor} size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView
      style={css`
        flex: 1;
      `}
    >
      <RootProvider initialThemeType={localThemeType as ColorSchemeName}>
        <>
          <StatusBarBrightness />
          <Layout />
        </>
      </RootProvider>
    </GestureHandlerRootView>
  );
}
