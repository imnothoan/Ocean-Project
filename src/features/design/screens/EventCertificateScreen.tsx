import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 258:1450 · Event Certificate
export function EventCertificateScreen() {
  return (
    <Frame id="258:1450" width={393.0} height={852} background={"#ffffff"}>
      <Artwork node="258:1452" box={[19.25, 132.25, 354.5, 501.5]} source={require('../../../../assets/figma/mobile/93009.svg')} />
      <Artwork node="258:1453" box={[30.5, 143.5, 332, 479]} source={require('../../../../assets/figma/mobile/f1c9d.svg')} />
      <Copy node="258:1454" box={[147.5, 174, 97, 24]} text={"OCEAN CARE"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#73787d","textAlign":"center"}} />
      <Artwork node="258:1455" box={[99.5, 201.5, 194, 1]} source={require('../../../../assets/figma/mobile/8973b.svg')} />
      <Copy node="258:1456" box={[150.5, 234, 91, 24]} text={"CERTIFICATE"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#73787d","textAlign":"center"}} />
      <Copy node="258:1457" box={[63.5, 258, 265, 27]} text={"OF COMMUNITY CONTRIBUTION"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#0186a8","textAlign":"center"}} />
      <Artwork node="258:1458" box={[164.5, 308.5, 63, 63]} source={require('../../../../assets/figma/mobile/1bf1e.svg')} />
      <Copy node="258:1459" box={[156, 392, 80, 21]} text={"Presented to"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"center"}} />
      <Copy node="258:1460" box={[111.5, 411, 168, 37]} text={"Community member"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":28,"lineHeight":33.6,"color":"#0186a8","textAlign":"center"}} />
      <Copy node="258:1461" box={[119.5, 464, 153, 19]} text={"For valuable contribution to"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#73787d","textAlign":"center"}} />
      <Copy node="258:1462" box={[132.5, 480, 127, 19]} text={"My Khe Beach Cleanup"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":16.8,"color":"#0186a8","textAlign":"center"}} />
      <Copy node="258:1463" box={[150, 534, 92, 17]} text={"October 20, 2026"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":13,"lineHeight":15.6,"color":"#73787d","textAlign":"center"}} />
      <Artwork node="258:1464" box={[104.5, 574.5, 73, 1]} source={require('../../../../assets/figma/mobile/87644.svg')} />
      <Artwork node="258:1465" box={[214.5, 574.5, 73, 1]} source={require('../../../../assets/figma/mobile/87644.svg')} />
      <Copy node="258:1466" box={[115, 585, 52, 17]} text={"Organizer"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":13,"lineHeight":15.6,"color":"#73787d","textAlign":"center"}} />
      <Copy node="258:1467" box={[220, 585, 63, 17]} text={"Ocean Care"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":13,"lineHeight":15.6,"color":"#73787d","textAlign":"center"}} />
      <Copy node="258:1468" box={[112.5, 646, 166, 19]} text={"Certificate ID: OC-2026-2048"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":16.8,"color":"#0186a8","textAlign":"center"}} />
      <Artwork node="258:1469" box={[20, 696, 353, 50]} source={require('../../../../assets/figma/mobile/37ea2.svg')} />
      <Copy node="258:1470" box={[123, 708, 148, 24]} text={"Download certificate"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#ffffff","textAlign":"center"}} />
      <Artwork node="258:1471" box={[19.5, 755.5, 354, 51]} source={require('../../../../assets/figma/mobile/55db7.svg')} />
      <Copy node="258:1472" box={[139, 768, 116, 24]} text={"Share certificate"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#73787d","textAlign":"center"}} />
      <Surface node="258:1474" box={[84, 69, 234, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="258:1475" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/ecd92.svg')} />
      <Copy node="258:1478" box={[109, 77, 186, 27]} text={"Contribution Certificate"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="258:1479" box={[178, 322, 36, 36]} source={require('../../../../assets/figma/mobile/5d642.svg')} />
      <Link node="258:1475" box={[23, 69, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
