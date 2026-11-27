import { EventList } from '../EventLists';
import { Artwork, Copy, Footer, Frame, Link, Surface } from '../components';

// Figma 564:290 · Event Home - CTV
export function EventHomeCtvScreen() {
  return (
    <Frame id="564:290" width={393.0} height={1005} background={"#ffffff"}>
      <Copy node="organizerBack" box={[22,71,50,32]} text={"‹ Back"} typeStyle={{fontFamily:"AfacadFlux_600SemiBold",fontSize:18,color:"#0186a8"}}/>
      <Copy node="organizerTitle" box={[95,68,200,36]} text={"Organizer"} typeStyle={{fontFamily:"AfacadFlux_700Bold",fontSize:22,textAlign:"center",color:"#091727"}}/>
      <EventList organizer/>
      <Footer top={754} />
    </Frame>
  );
}
