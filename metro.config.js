const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
// Figma SVGs may contain percentage-only root sizes. The frame supplies their display geometry.
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts.push('svg');
config.transformer.babelTransformerPath = require.resolve('./scripts/figma-svg-transformer');
module.exports = config;
