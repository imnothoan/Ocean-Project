import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 258:1226 · Create Event - Step 1
export function CreateEventStep1Screen() {
  return (
    <Frame id="258:1226" width={393.0} height={852} background={"#ffffff"}>
      <Artwork node="258:1226" box={[0, 0, 393, 852]} source={require('../../../../assets/figma/mobile/58c51.svg')} />
      <Copy node="258:1228" box={[20, 124, 68, 21]} text={"Step 1 of 4"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:1229" box={[20, 149, 353, 4]} source={require('../../../../assets/figma/mobile/a6a33.svg')} />
      <Artwork node="258:1230" box={[20, 149, 89, 4]} source={require('../../../../assets/figma/mobile/106c4.svg')} />
      <Copy node="258:1231" box={[20, 169, 181, 35]} text={"Start with an idea"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":26,"lineHeight":31.2,"color":"#202326","textAlign":"left"}} />
      <Copy node="258:1232" box={[20, 203, 242, 21]} text={"Share the basics with your community."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Copy node="258:1233" box={[22, 238, 74, 21]} text={"Event name"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:1234" box={[19.5, 262.5, 354, 48]} source={require('../../../../assets/figma/mobile/6f4c4.svg')} />
      <Copy node="258:1235" box={[34, 277, 129, 19]} text={"e.g. Beach cleanup day"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#73787d","textAlign":"left"}} />
      <Copy node="258:1236" box={[20, 332, 80, 21]} text={"Activity type"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Copy node="258:1237" box={[22, 407, 77, 21]} text={"Event image"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:1238" box={[32, 361, 93, 30]} source={require('../../../../assets/figma/mobile/2b811.svg')} />
      <Copy node="258:1239" box={[55, 366, 47, 19]} text={"Cleanup"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":16.8,"color":"#ffffff","textAlign":"center"}} />
      <Artwork node="258:1240" box={[132, 361, 93, 30]} source={require('../../../../assets/figma/mobile/e1a16.svg')} />
      <Copy node="258:1241" box={[151, 366, 54, 19]} text={"Education"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":16.8,"color":"#73787d","textAlign":"center"}} />
      <Artwork node="258:1242" box={[232, 361, 130, 30]} source={require('../../../../assets/figma/mobile/67168.svg')} />
      <Copy node="258:1243" box={[275, 366, 44, 19]} text={"Rescues"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":16.8,"color":"#73787d","textAlign":"center"}} />
      <Copy node="258:1244" box={[22, 602, 72, 21]} text={"Description"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:1245" box={[20, 768, 353, 50]} source={require('../../../../assets/figma/mobile/e892f.svg')} />
      <Copy node="258:1246" box={[165, 781, 65, 24]} text={"Continue"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#ffffff","textAlign":"center"}} />
      <Surface node="258:1248" box={[121, 69, 152, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="258:1249" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/ecd92.svg')} />
      <Copy node="258:1252" box={[146, 77, 101, 27]} text={"Create Event"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="258:1253" box={[20, 631, 353, 118]} fill={"#edfbff"} radius={10} />
      <Copy node="258:1254" box={[34, 643, 148, 19]} text={"Goals and activity details..."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:1256" box={[20, 431, 353, 151]} source={require('../../../../assets/figma/mobile/5016a.png')} radius={10} />
      <Link node="258:1245" box={[20, 768, 353, 50]} to="258:1279" label={"Create Event - Step 2"} />
      <Link node="258:1249" box={[23, 69, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
