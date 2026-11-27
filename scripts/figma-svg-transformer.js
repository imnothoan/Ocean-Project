const upstream = require('@expo/metro-config/babel-transformer');
const { Resvg } = require('@resvg/resvg-js');

module.exports.transform = function transform(input) {
  if (!input.filename.endsWith('.svg')) return upstream.transform(input);
  const native = input.options.platform === 'ios' || input.options.platform === 'android';
  // Rasterize the original paths, masks and gradients once in Metro. Expo Go can
  // then decode this artwork with the same PNG decoder as other bundled assets.
  const bytes = native
    ? new Resvg(input.src, { fitTo: { mode: 'zoom', value: 3 } }).render().asPng()
    : Buffer.from(input.src, 'utf8');
  const mime = native ? 'image/png' : 'image/svg+xml';
  const uri = 'data:' + mime + ';base64,' + bytes.toString('base64');
  return upstream.transform({ ...input, src: 'module.exports = { uri: ' + JSON.stringify(uri) + ' };' });
};
