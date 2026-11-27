import { EventList } from '../EventLists';
import { Artwork, Copy, Footer, Frame, Link, Surface } from '../components';

// Figma 564:290 · Event Home - CTV
export function EventHomeCtvScreen() {
  return (
    <Frame id="564:290" width={393.0} height={1005} background={"#ffffff"}>
      <Copy node="organizerBack" box={[22,71,50,32]} text={"‹ Back"} typeStyle={{fontFamily:"AfacadFlux_600SemiBold",fontSize:18,color:"#0186a8"}}/>
      <Copy node="organizerTitle" box={[95,68,200,36]} text={"Organizer"} typeStyle={{fontFamily:"AfacadFlux_700Bold",fontSize:22,textAlign:"center",color:"#091727"}}/>
      <EventList organizer/>
      <Footer top={754}>
        <Surface node="718:793" box={[22, 779, 350, 49]} fill={"#a5e0f2"} radius={18} />
        <Surface node="718:794" box={[94, 779, 113, 49]} fill={"#a5e0f2"} radius={18} />
        <Surface node="718:795" box={[94, 779, 123, 49]} fill={"#0186a8"} radius={18} />
        <Artwork node="718:796" box={[159, 754, 75, 75]} source={require('../../../../assets/figma/mobile/db901.svg')} />
        <Artwork node="718:797" box={[164, 760, 65, 65]} source={require('../../../../assets/figma/mobile/19ec0.svg')} />
        <Artwork node="718:798" box={[121, 792, 24, 24]} source={require('../../../../assets/figma/mobile/97536.svg')} />
        <Artwork node="718:799" box={[50, 792, 24, 24]} source={require('../../../../assets/figma/mobile/0b6f6.svg')} />
        <Artwork node="718:800" box={[249, 792, 24, 24]} source={require('../../../../assets/figma/mobile/79424.svg')} />
        <Artwork node="718:801" box={[320, 792, 24, 24]} source={require('../../../../assets/figma/mobile/8137a.svg')} />
        <Artwork node="718:802" box={[185, 781, 24, 24]} source={require('../../../../assets/figma/mobile/5900e.svg')} />
        <Link node="718:799" box={[50, 792, 24, 24]} to="403:2759" label={"Q - 20"} />
        <Link node="718:800" box={[249, 792, 24, 24]} to="101:2769" label={"01_UI_Community_Feed"} />
        <Link node="718:801" box={[320, 792, 24, 24]} to="666:3592" label={"10_UI_My_Profile_Eco_Impact"} />
      </Footer>
    </Frame>
  );
}
