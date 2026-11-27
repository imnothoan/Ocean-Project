import { ImpactExport } from '../ImpactExport';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 311:1506 · Frame 12 - Export & Share
export function Frame12ExportShareScreen() {
  return (
    <Frame id="311:1506" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="311:1573" box={[119, 69, 155, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="311:1574" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Copy node="311:1577" box={[139, 77, 116, 26]} text={"Export & Share"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Link node="311:1574" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <ImpactExport/>
    </Frame>
  );
}
