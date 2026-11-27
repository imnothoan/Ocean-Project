const path = require('node:path');
const { getDefaultConfig } = require('expo/metro-config');
const phoneArtwork = require('./scripts/figma-phone-assets');

const config = getDefaultConfig(__dirname);
const artwork = phoneArtwork(__dirname);
const upstream = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if ((platform === 'ios' || platform === 'android') && moduleName.endsWith('.svg')) {
    const source = path.resolve(path.dirname(context.originModulePath), moduleName);
    moduleName = artwork.get(source) ?? moduleName;
  }
  return (upstream ?? context.resolveRequest)(context, moduleName, platform);
};
// The existing browser preview can use the SVG directly.
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts.push('svg');
config.transformer.babelTransformerPath = require.resolve('./scripts/figma-svg-transformer');
module.exports = config;
