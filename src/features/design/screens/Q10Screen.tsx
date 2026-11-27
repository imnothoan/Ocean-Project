import { ReportHistory } from '../ReportLists';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 292:4022 · Q - 10
export function Q10Screen() {
  return (
    <Frame id="292:4022" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="292:4023" box={[22, 145, 342, 43]} fill={"#ffffff"} radius={20} stroke={[0.5,"rgba(0,0,0,0.2)"]} />
      <Artwork node="292:4024" box={[44, 158, 20, 20]} source={require('../../../../assets/figma/mobile/73047.svg')} />
      <Copy node="292:4025" box={[72, 157, 245, 19]} text={"Search report title, ID, or area ..."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#666666","textAlign":"left"}} />
      <Surface node="292:4026" box={[23, 200, 89, 27]} fill={"rgba(67,196,214,0.7)"} radius={18} stroke={[0.5,"rgba(0,0,0,0.6)"]} />
      <Copy node="292:4029" box={[36, 202, 61, 23]} text={"All Severity"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":22.8,"color":"#2b2b2b","textAlign":"left"}} />
      <Surface node="292:4027" box={[123, 200, 82, 28]} fill={"rgba(255,255,255,0.7)"} radius={18} stroke={[0.5,"rgba(0,0,0,0.2)"]} />
      <Copy node="292:4030" box={[145, 202, 38, 23]} text={"Urgent"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":22.8,"color":"#2b2b2b","textAlign":"left"}} />
      <Copy node="292:4031" box={[235, 201, 55, 23]} text={"Moderate"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":22.8,"color":"#2b2b2b","textAlign":"left"}} />
      <Surface node="292:4034" box={[97, 68, 200, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="292:4035" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/a3c75.svg')} />
      <Copy node="292:4038" box={[127, 75, 152, 27]} text={"Report Moderation"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Link node="292:4035" box={[23, 69, 43, 43]} to="722:6967" label={"Q - 37"} />
      <ReportHistory moderation/>
    </Frame>
  );
}
