import { ReportTimeline } from '../ReportLists';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 1249:216 · 16. Report Status Tracker
export function Frame16ReportStatusTrackerScreen() {
  return (
    <Frame id="1249:216" width={394.61053466796875} height={852} background={"#ffffff"}>
      <Copy node="1249:227" box={[20.18, 133.41, 347.53, 22.42]} text={"Track your report"} typeStyle={{"fontFamily":"Inter_700Bold","fontSize":22.421052932739258,"lineHeight":26.91,"color":"#183044","textAlign":"left"}} />
      <Copy node="1249:228" box={[20.18, 164.79, 341.92, 22.42]} text={"See the latest status and progress."} typeStyle={{"fontFamily":"Inter_400Regular","fontSize":13.452630996704102,"lineHeight":16.14,"color":"#637b89","textAlign":"left"}} />
      <Surface node="1249:289" box={[129, 67, 139, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="1249:290" box={[23.31, 66, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/7330f.svg')} />
      <Artwork node="1249:293" box={[332.31, 66, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/9fd81.svg')} />
      <Artwork node="1249:295" box={[340.31, 75, 26.27, 24]} source={require('../../../../assets/figma/mobile/c9b94.svg')} />
      <Copy node="1249:296" box={[129.31, 75, 139, 27]} text={"Report Status"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"center"}} />
      <Copy node="1249:232" box={[182, 217, 91, 22]} text={"Report ID"} typeStyle={{"fontFamily":"Inter_400Regular","fontSize":12.331579208374023,"lineHeight":14.8,"color":"#637b89","textAlign":"left"}} />
      <Copy node="1249:233" box={[182, 238, 147, 23]} text={"POL-2026-0487"} typeStyle={{"fontFamily":"Inter_700Bold","fontSize":16.8157901763916,"lineHeight":20.18,"color":"#183044","textAlign":"left"}} />
      <Copy node="1249:234" box={[182, 266, 180, 22]} text={"Submitted 13 Oct 2026 • 09:45"} typeStyle={{"fontFamily":"Inter_400Regular","fontSize":11.210526466369629,"lineHeight":13.45,"color":"#637b89","textAlign":"left"}} />
      <Artwork node="1249:335" box={[36, 213, 130, 82]} source={require('../../../../assets/figma/mobile/13615.png')} radius={12} />
      <Link node="1249:290" box={[23, 66, 43, 43]} to="back" label={"Back"} />
      <ReportTimeline/>
    </Frame>
  );
}
