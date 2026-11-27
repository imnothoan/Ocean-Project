import { AreaDetail } from '../Impact';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 311:869 · Frame 6 - Area Comparison
export function Frame6AreaComparisonScreen() {
  return (
    <Frame id="311:869" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="311:917" box={[107, 69, 180, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="311:918" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Copy node="311:921" box={[129, 77, 138, 26]} text={"Area Comparison"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Link node="311:918" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <AreaDetail compare/>
    </Frame>
  );
}
