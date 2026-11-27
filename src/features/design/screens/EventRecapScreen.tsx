import { EventRecapMemories } from '../EventLists';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 1356:3049 · Event Recap
export function EventRecapScreen() {
  return (
    <Frame id="1356:3049" width={393.0} height={852} background={"#ffffff"}>
      <Copy node="1356:3059" lines={1} box={[21, 145, 351, 37]} text={"My Khe Beach Cleanup"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":28,"lineHeight":33.6,"color":"#202326","textAlign":"left"}} />
      <Copy node="1356:3060" lines={1} box={[21, 181, 351, 21]} text={"Oct 20 · 6:30 AM · Cleanup"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="1431:261" box={[119.4, 610.4, 315.2, 358.2]} source={require('../../../../assets/figma/mobile/02c27.svg')} />
      <Artwork node="1431:263" box={[-39.6, 517.4, 271.2, 358.2]} source={require('../../../../assets/figma/mobile/1830a.svg')} />
      <Surface node="1356:3125" box={[11, 215, 372, 344]} fill={"#edfbff"} radius={12} stroke={[1,"#cdcdcd"]} shadow={[0,4,4,0,"rgba(0,0,0,0.25)"]} />
      <Copy node="1356:3119" box={[151, 228, 92, 32]} text={"Overview"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":24,"lineHeight":28.8,"color":"#4b5669","textAlign":"left"}} />
      <Surface node="1356:3063" box={[20, 271, 170, 130]} fill={"#ccf1e5"} radius={15} stroke={[1,"#43c4d6"]} />
      <Surface node="1356:3064" box={[201, 271, 170, 130]} fill={"#ccf1e5"} radius={15} stroke={[1,"#43c4d6"]} />
      <Surface node="1356:3065" box={[20, 418, 170, 130]} fill={"#ccf1e5"} radius={15} stroke={[1,"#43c4d6"]} />
      <Surface node="1356:3066" box={[201, 418, 170, 130]} fill={"#ccf1e5"} radius={15} stroke={[1,"#43c4d6"]} />
      <Copy node="1356:3075" box={[57, 329, 96, 19]} text={"Waste collected"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#8f98a2","textAlign":"center"}} />
      <Copy node="1356:3076" box={[57, 472, 96, 19]} text={"Participants"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#8f98a2","textAlign":"center"}} />
      <Copy node="1356:3077" box={[55, 490, 96, 40]} text={"24"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":30,"lineHeight":36.0,"color":"#43c4d6","textAlign":"center"}} />
      <Copy node="1356:3078" box={[237, 488, 96, 40]} text={"3"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":30,"lineHeight":36.0,"color":"#43c4d6","textAlign":"center"}} />
      <Copy node="1356:3121" box={[55, 347, 96, 40]} text={"136 kg"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":30,"lineHeight":36.0,"color":"#43c4d6","textAlign":"center"}} />
      <Copy node="1356:3122" box={[237, 345, 96, 40]} text={"87 kg"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":30,"lineHeight":36.0,"color":"#43c4d6","textAlign":"center"}} />
      <Copy node="1356:3079" box={[238, 472, 96, 19]} text={"Hour duration"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#8f98a2","textAlign":"center"}} />
      <Copy node="1356:3080" box={[238, 326, 96, 19]} text={"Recyclable waste"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#8f98a2","textAlign":"center"}} />
      <Artwork node="1356:3082" box={[271, 292, 30, 30]} source={require('../../../../assets/figma/mobile/3f90f.svg')} />
      <Artwork node="1356:3083" box={[85, 439, 35, 35]} source={require('../../../../assets/figma/mobile/eee46.svg')} />
      <Artwork node="1356:3084" box={[271, 439, 30, 30]} source={require('../../../../assets/figma/mobile/3f7ad.svg')} />
      <Artwork node="1356:3085" box={[92, 292, 25, 28]} source={require('../../../../assets/figma/mobile/7469e.svg')} />
      <Surface node="1356:3052" box={[131, 69, 131, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="1356:3053" box={[25, 69, 43, 43]} source={require('../../../../assets/figma/mobile/5110e.svg')} />
      <Copy node="1356:3056" box={[149, 76, 96, 27]} text={"Event Recap"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Link node="1356:3053" box={[25, 69, 43, 43]} to="back" label={"Back"} />
      <EventRecapMemories />
    </Frame>
  );
}
