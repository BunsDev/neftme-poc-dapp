const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

const aliases = {
  '@assets': path.resolve('./assets'),
  '@components': path.resolve('./src/components'),
  '@hocs': path.resolve('./src/hocs/index.js'),
  '@library': path.resolve('./src/components/library/index.js'),
  '@services': path.resolve('./src/services'),
};

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve.alias = {
    ...config.resolve.alias,
    ...aliases,
  };

  return config;
};
