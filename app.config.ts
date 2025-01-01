import 'dotenv/config';

import type {ConfigContext, ExpoConfig} from '@expo/config';
import withAndroidLocalizedName from '@mmomtchev/expo-android-localized-app-name';
import dotenv from 'dotenv';
import {expand} from 'dotenv-expand';
import path from 'path';

import {version} from './package.json';

// https://github.com/expo/expo/issues/23727#issuecomment-1651609858
if (process.env.STAGE) {
  expand(
    dotenv.config({
      path: path.join(
        __dirname,
        ['./.env', process.env.STAGE].filter(Boolean).join('.'),
      ),
      override: true,
    }),
  );
}

const DEEP_LINK_URL = '[firebaseAppId].web.app';

const buildNumber = 1;

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'myapp',
  scheme: 'myapp',
  slug: 'myapp-slug',
  platforms: ['ios', 'android', 'web'],
  version,
  orientation: 'default',
  icon: './assets/icon.png',
  newArchEnabled: true,
  plugins: [
    // @ts-ignore
    withAndroidLocalizedName,
    'expo-router',
    'expo-tracking-transparency',
    'expo-localization',
    [
      'expo-font',
      {
        fonts: [
          'node_modules/cpk-ui/components/uis/Icon/cpk.ttf',
          'node_modules/cpk-ui/components/uis/Icon/Pretendard-Bold.otf',
          'node_modules/cpk-ui/components/uis/Icon/Pretendard-Regular.otf',
          'node_modules/cpk-ui/components/uis/Icon/Pretendard-Thin.otf',
        ],
      },
    ],
    [
      'expo-splash-screen',
      // https://github.com/expo/expo/issues/32515#issuecomment-2533398853
      {
        image: './assets/icon.png',
        backgroundColor: '#1B1B1B',
        dark: {backgroundColor: '#1B1B1B'},
        ios: {
          resizeMode: 'cover',
          image: './assets/splash.png',
        },
        enableFullScreenImage_legacy: true,
        android: {imageWidth: 200},
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    ROOT_URL: process.env.ROOT_URL,
    expoProjectId: process.env.expoProjectId,
    firebaseWebApiKey: process.env.firebaseWebApiKey,
    // eas: {projectId: ''},
  },
  updates: {
    fallbackToCacheTimeout: 0,
    // requestHeaders: {'expo-channel-name': 'production'},
    // url: '',
  },
  assetBundlePatterns: ['**/*'],
  userInterfaceStyle: 'automatic',
  locales: {
    ko: './assets/langs/ios/ko.json',
  },
  ios: {
    buildNumber: buildNumber.toString(),
    bundleIdentifier: 'io.myapp',
    associatedDomains: [`applinks:${DEEP_LINK_URL}`],
    supportsTablet: true,
    entitlements: {
      'com.apple.developer.applesignin': ['Default'],
    },
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
  },
  android: {
    userInterfaceStyle: 'automatic',
    permissions: [
      'RECEIVE_BOOT_COMPLETED',
      'CAMERA',
      'CAMERA_ROLL',
      'READ_EXTERNAL_STORAGE',
      'WRITE_EXTERNAL_STORAGE',
      'NOTIFICATIONS',
      'USER_FACING_NOTIFICATIONS',
    ],
    package: 'io.myapp',
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: true,
        data: {
          scheme: 'https',
          host: DEEP_LINK_URL,
          pathPrefix: '/',
        },
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
  },
  description: 'Starter project from dooboo-cli.',
  web: {bundler: 'metro', favicon: './assets/favicon.png'},
});
