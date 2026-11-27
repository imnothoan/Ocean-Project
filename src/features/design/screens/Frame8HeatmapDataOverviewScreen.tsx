import { AreaList } from '../Impact';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 311:1093 · Frame 8 - Heatmap Data Overview
export function Frame8HeatmapDataOverviewScreen() {
  return (
    <Frame id="311:1093" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="311:1134" box={[102, 69, 190, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="311:1135" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Copy node="311:1138" box={[124, 77, 146, 26]} text={"Pollution Heatmap"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Link node="311:1135" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <AreaList overview/>
    </Frame>
  );
}
