const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  
  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  config.resolver = {
    extraNodeModules: {
    crypto: require.resolve('crypto-browserify'),
    url: require.resolve('url/'),
    fs: require.resolve('expo-file-system'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser.js'),
    stream: require.resolve('readable-stream'),
    vm: require.resolve('vm-browserify'),
    net: require.resolve('react-native-tcp'),
    path: require.resolve('path-browserify'),
    ...config.resolver?.resolver?.extraNodeModules,
    },
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg', 'js', 'jsx', 'ts', 'tsx', 'cjs'],
  };

  return config;
})();
