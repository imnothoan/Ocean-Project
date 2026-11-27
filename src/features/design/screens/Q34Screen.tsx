import { ApplicationQueue } from '../VolunteerLists';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 605:523 · Q - 34
export function Q34Screen() {
  return (
    <Frame id="605:523" width={393.0} height={852} background={"#ffffff"}>
      <Artwork node="605:599" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/a3c75.svg')} />
      <Surface node="605:598" box={[97, 69, 206, 43]} fill={"#a5e0f2"} radius={20} />
      <Copy node="605:602" box={[152, 76, 97, 27]} text={"Applications"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="606:626" box={[23, 136, 82, 23]} text={"Pending (12)"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":22.8,"color":"#43c4d6","textAlign":"left"}} />
      <Copy node="606:636" box={[314, 136, 56, 23]} text={"Rejected"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":22.8,"color":"#00000099","textAlign":"left"}} />
      <Copy node="606:638" box={[164, 136, 62, 23]} text={"Approved"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":22.8,"color":"#00000099","textAlign":"left"}} />
      <Artwork node="606:640" box={[0, 167.77, 393, 0.7]} source={require('../../../../assets/figma/mobile/0eab3.svg')} />
      <Artwork node="606:642" box={[0, 167.01, 131, 2.46]} source={require('../../../../assets/figma/mobile/196fa.svg')} />
      <Surface node="606:649" box={[25, 188, 193, 32]} fill={"#ffffff"} radius={18} stroke={[0.5,"rgba(0,0,0,0.3)"]} />
      <Artwork node="606:650" box={[48.37, 196.49, 17.25, 17.25]} source={require('../../../../assets/figma/mobile/821b4.svg')} />
      <Copy node="606:651" box={[75, 196.93, 245, 14.14]} text={"Search ..."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#666666","textAlign":"left"}} />
      <Surface node="606:657" box={[237, 189, 133, 32]} fill={"rgba(255,255,255,0.8)"} radius={8} stroke={[0.5,"rgba(0,0,0,0.3)"]} />
      <Copy node="606:661" box={[247, 195, 80, 19]} text={"Ngu Hanh Son"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#666666","textAlign":"left"}} />
      <Artwork node="606:663" box={[347, 202, 10.54, 6.25]} source={require('../../../../assets/figma/mobile/243a4.svg')} />
      <Artwork node="1309:2845" box={[404, 30, 171, 118]} source={require('../../../../assets/figma/mobile/abf1d.png')} />
      <Link node="605:599" box={[23, 69, 43, 43]} to="722:6967" label={"Q - 37"} />
      <ApplicationQueue/>
    </Frame>
  );
}
