/**
 * monkey patching the locale to avoid the error:
 * Something went wrong initializing the native ReactLocalization module
 * https://gist.github.com/MoOx/08b465c3eac9e36e683929532472d1e0
 */
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import type {GlobalWithFetchMock} from 'jest-fetch-mock';

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock &
  // eslint-disable-next-line no-undef
  typeof globalThis;

// eslint-disable-next-line @typescript-eslint/no-require-imports
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

global.__reanimatedWorkletInit = jest.fn();

jest.mock('expo-router');
jest.mock('@expo/react-native-action-sheet');

jest.mock('expo-font', () => {
  return {useFonts: () => []};
});

jest.mock('expo-localization', () => ({
  locale: 'en',
  locales: ['en'],
  timezone: 'Asia/Seoul',
  isoCurrencyCodes: ['USD'],
  region: 'US',
  isRTL: false,
  getLocales: () => [
    {
      languageTag: 'en',
      languageCode: 'en',
      regionCode: 'US',
      currencyCode: 'USD',
      currencySymbol: '$',
      decimalSeparator: '.',
      digitGroupingSeparator: ',',
    },
  ],
}));

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-reanimated', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('react-native-reanimated/mock'),
);

if (!global.Window) {
  Object.defineProperty(global, 'Window', {
    value: window.constructor,
    writable: true,
    enumerable: true,
    configurable: true,
  });
}
