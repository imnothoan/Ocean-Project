import { AdminFinance } from '../Impact';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 292:4283 · Q - 15
export function Q15Screen() {
  return (
    <Frame id="292:4283" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="292:4286" box={[97, 69, 206, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="292:4287" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/a3c75.svg')} />
      <Copy node="292:4290" box={[122, 76, 163, 27]} text={"Fund & Transparency"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Link node="292:4287" box={[23, 69, 43, 43]} to="722:6967" label={"Q - 37"} />
      <AdminFinance/>
    </Frame>
  );
}
