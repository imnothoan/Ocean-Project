import { NoticeFeed } from '../VolunteerLists';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 1358:343 · Q - 45
export function Q45Screen() {
  return (
    <Frame id="1358:343" width={393.0} height={852} background={"#ffffff"}>
      <Artwork node="1358:345" box={[22, 67, 43, 43]} source={require('../../../../assets/figma/mobile/bbb58.svg')} />
      <Surface node="1358:349" box={[96, 66, 200, 43]} fill={"#a5e0f2"} radius={20} />
      <Copy node="1358:350" box={[146, 74, 100, 27]} text={"Notifications"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="1358:470" box={[22, 134, 55, 32]} fill={"rgba(67,196,214,0.7)"} radius={18} stroke={[0.5,"#0186a8"]} />
      <Copy node="1358:471" box={[41, 138, 14, 23]} text={"All"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":22.8,"color":"#ffffff","textAlign":"left"}} />
      <Surface node="1358:473" box={[90, 134, 79, 32]} fill={"#ffffff"} radius={18} stroke={[1,"rgba(115,120,125,0.3)"]} />
      <Copy node="1358:474" box={[108, 138.13, 56, 23.74]} text={"Unread"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":22.8,"color":"#2b2b2b","textAlign":"left"}} />
      <Surface node="1358:476" box={[182, 134, 88, 32]} fill={"#ffffff"} radius={18} stroke={[1,"rgba(115,120,125,0.3)"]} />
      <Copy node="1358:477" box={[199, 138.13, 57, 23]} text={"Important"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":22.8,"color":"#2b2b2b","textAlign":"left"}} />
      <Link node="1358:345" box={[22, 67, 43, 43]} to="403:2759" label={"Q - 20"} />
      <NoticeFeed/>
    </Frame>
  );
}
