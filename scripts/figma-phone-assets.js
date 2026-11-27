const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { Resvg } = require('@resvg/resvg-js');

// Metro serves registered images on demand in Expo Go. Keeping the original
// pixels out of JavaScript avoids downloading every screen's artwork at launch.
module.exports = function phoneArtwork(root) {
  const source = path.join(root, 'assets', 'figma', 'mobile');
  const cache = path.join(root, 'assets', 'figma', 'native-cache');
  fs.mkdirSync(cache, { recursive: true });
  const names = new Map();
  for (const name of fs.readdirSync(source)) {
    if (!name.endsWith('.svg')) continue;
    const svg = fs.readFileSync(path.join(source, name));
    const key = createHash('sha256').update('resvg-2.6.2-zoom-3:').update(svg).digest('hex').slice(0, 24);
    const base = path.join(cache, key);
    const destination = base + '@3x.png';
    if (!fs.existsSync(destination)) {
      const png = new Resvg(svg, { fitTo: { mode: 'zoom', value: 3 } }).render().asPng();
      const temp = destination + '.' + process.pid + '.tmp';
      fs.writeFileSync(temp, png);
      fs.renameSync(temp, destination);
    }
    names.set(path.join(source, name), base + '.png');
  }
  return names;
};
