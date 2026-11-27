import { AreaDetail } from '../Impact';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 311:942 · Frame 7 - Area Details Metrics
export function Frame7AreaDetailsMetricsScreen() {
  return (
    <Frame id="311:942" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="311:1068" box={[127, 69, 140, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="311:1069" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Copy node="311:1072" box={[149, 77, 97, 26]} text={"Area Details"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Link node="311:1069" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <AreaDetail/>
    </Frame>
  );
}
