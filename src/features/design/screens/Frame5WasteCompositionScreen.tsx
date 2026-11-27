import { WasteComposition } from '../Impact';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 311:771 · Frame 5 - Waste Composition
export function Frame5WasteCompositionScreen() {
  return (
    <Frame id="311:771" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="311:844" box={[102, 69, 190, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="311:845" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Copy node="311:848" box={[121, 77, 153, 26]} text={"Waste Composition"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Link node="311:845" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <WasteComposition/>
    </Frame>
  );
}
