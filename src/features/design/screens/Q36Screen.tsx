import { AdminOverview } from '../Impact';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 692:477 · Q - 36
export function Q36Screen() {
  return (
    <Frame id="692:477" width={393.0} height={1795} background={"#ffffff"}>
      <Surface node="737:943" box={[21, 64, 348, 1731]} fill={"#ffffff"} />
      <Surface node="737:1127" box={[118, 64, 153, 41]} fill={"#a5e0f2"} radius={20} />
      <Copy node="737:1128" box={[152, 70, 77, 27]} text={"Overview"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="737:1129" box={[21, 64, 43, 43]} source={require('../../../../assets/figma/mobile/ed2c2.svg')} />
      <Link node="737:1129" box={[21, 64, 43, 43]} to="722:6967" label={"Q - 37"} />
      <AdminOverview/>
    </Frame>
  );
}
