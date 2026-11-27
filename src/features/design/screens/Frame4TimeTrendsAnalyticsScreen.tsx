import { Trends } from '../Impact';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 311:716 · Frame 4 - Time Trends Analytics
export function Frame4TimeTrendsAnalyticsScreen() {
  return (
    <Frame id="311:716" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="311:746" box={[114, 69, 165, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="311:747" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Copy node="311:750" box={[135, 77, 124, 26]} text={"Pollution Trends"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Link node="311:747" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <Trends/>
    </Frame>
  );
}
