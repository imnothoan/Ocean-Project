import { CheckInScanner } from '../CheckInTools';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 258:1135 · Event Check-in
export function EventCheckInScreen() {
  return (
    <Frame id="258:1135" width={393.0} height={852} background={"#ffffff"}>
      <Copy node="258:1137" box={[78, 140, 236, 35]} text={"My Khe Beach Cleanup"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":26,"lineHeight":31.2,"color":"#202326","textAlign":"center"}} />
      <Copy node="258:1138" box={[115, 176, 163, 21]} text={"Sunday, Oct 20 · 6:30 AM"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"center"}} />
      <Artwork node="258:1139" box={[20, 718, 353, 50]} source={require('../../../../assets/figma/mobile/7a127.svg')} />
      <Copy node="258:1140" box={[172, 731, 50, 24]} text={"Submit"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#ffffff","textAlign":"center"}} />
      <Artwork content={<CheckInScanner/>} node="258:1142" box={[36, 229, 321, 246]} source={require('../../../../assets/figma/mobile/7e54a.jpg')} radius={10} />
      <Surface node="258:1145" box={[36, 505, 322, 47]} fill={"#ffffff"} radius={20} stroke={[1,"#43c4d6"]} />
      <Copy node="258:1146" box={[53, 518, 177, 21]} text={"Enter the check-in code"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#43c4d696","textAlign":"left"}} />
      <Copy node="258:1147" box={[40, 586, 314, 42]} text={"Enter the check-in code to receive your certificate at the end of this event "} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":19.2,"color":"#a3a7a9","textAlign":"left"}} />
      <Surface node="258:1149" box={[146, 69, 101, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="258:1150" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/ecd92.svg')} />
      <Artwork node="258:1153" box={[324, 69, 43, 43]} source={require('../../../../assets/figma/mobile/acbd8.svg')} />
      <Artwork node="258:1155" box={[334, 79, 24, 24]} source={require('../../../../assets/figma/mobile/57e4f.svg')} />
      <Copy node="258:1156" box={[163, 76, 68, 27]} text={"Check-in"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Link node="258:1139" box={[20, 718, 353, 50]} to="258:1177" label={"Event Check-in Completed"} />
      <Link node="258:1150" box={[23, 69, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
