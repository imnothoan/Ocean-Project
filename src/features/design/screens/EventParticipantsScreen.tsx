import { Participants } from '../EventLists';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 258:978 · Event Participants
export function EventParticipantsScreen() {
  return (
    <Frame id="258:978" width={393.0} height={852} background={"#ffffff"}>
      <Copy node="258:980" box={[79, 130, 236, 35]} text={"My Khe Beach Cleanup"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":26,"lineHeight":31.2,"color":"#202326","textAlign":"left"}} />
      <Copy node="258:981" box={[94, 166, 209, 21]} text={"12 registered · 30 spots available"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:982" box={[20, 200, 353, 42]} source={require('../../../../assets/figma/mobile/040e0.svg')} />
      <Copy node="258:983" box={[35, 211, 115, 20]} text={"Search participants"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":15,"lineHeight":18.0,"color":"#73787d","textAlign":"left"}} />
      <Surface node="258:1024" box={[121, 69, 152, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="258:1025" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/ecd92.svg')} />
      <Copy node="258:1028" box={[150, 76, 94, 27]} text={"Participants"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="258:1029" box={[338, 213, 16, 16]} source={require('../../../../assets/figma/mobile/75b76.svg')} />
      <Link node="258:1025" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <Participants/>
    </Frame>
  );
}
