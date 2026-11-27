import { EventList } from '../EventLists';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 258:906 · My Event
export function MyEventScreen() {
  return (
    <Frame id="258:906" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="258:912" box={[131, 69, 132, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="258:913" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/ecd92.svg')} />
      <Copy node="258:916" box={[160, 77, 71, 27]} text={"My Event"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Link node="258:913" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <EventList/>
    </Frame>
  );
}
