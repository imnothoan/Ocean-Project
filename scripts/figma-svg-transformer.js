const upstream = require('@expo/metro-config/babel-transformer');

module.exports.transform = function transform(input) {
  if (!input.filename.endsWith('.svg')) return upstream.transform(input);
  const uri = 'data:image/svg+xml;base64,' + Buffer.from(input.src, 'utf8').toString('base64');
  return upstream.transform({ ...input, src: 'module.exports = { uri: ' + JSON.stringify(uri) + ' };' });
};
