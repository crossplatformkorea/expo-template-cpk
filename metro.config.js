const path = require('path');
const {getDefaultConfig} = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('cjs', 'mjs');

// Replace react-native-web-hooks with React 19.2-compatible shim
// The original uses findDOMNode which was removed in React 19
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    platform === 'web' &&
    (moduleName === 'react-native-web-hooks' ||
      moduleName === 'react-native-web-hooks/build/hooks')
  ) {
    return {
      filePath: path.resolve(
        __dirname,
        'src/shims/react-native-web-hooks.js',
      ),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
