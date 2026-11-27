import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 258:1279 · Create Event - Step 2
export function CreateEventStep2Screen() {
  return (
    <Frame id="258:1279" width={393.0} height={852} background={"#ffffff"}>
      <Copy node="258:1281" box={[20, 122, 68, 21]} text={"Step 2 of 4"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:1282" box={[20, 147, 353, 4]} source={require('../../../../assets/figma/mobile/a6a33.svg')} />
      <Artwork node="258:1283" box={[20, 147, 168, 4]} source={require('../../../../assets/figma/mobile/41645.svg')} />
      <Copy node="258:1284" box={[20, 166, 228, 35]} text={"Set the place and time"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":26,"lineHeight":31.2,"color":"#202326","textAlign":"left"}} />
      <Copy node="258:1285" box={[20, 201, 252, 21]} text={"Clear details help people join with ease."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Copy node="258:1286" box={[22, 236, 54, 21]} text={"Location"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:1287" box={[19.5, 260.5, 354, 48]} source={require('../../../../assets/figma/mobile/6f4c4.svg')} />
      <Copy node="258:1288" box={[34, 277, 136, 19]} text={"My Khe Beach, Da Nang"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#73787d","textAlign":"left"}} />
      <Copy node="258:1289" box={[22, 496, 67, 21]} text={"Event date"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:1290" box={[19.5, 520.5, 354, 48]} source={require('../../../../assets/figma/mobile/6f4c4.svg')} />
      <Copy node="258:1291" box={[34, 537, 73, 19]} text={"Oct 20, 2026"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#73787d","textAlign":"left"}} />
      <Copy node="258:1292" box={[22, 579, 62, 21]} text={"Start time"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:1293" box={[19.5, 603.5, 354, 48]} source={require('../../../../assets/figma/mobile/6f4c4.svg')} />
      <Copy node="258:1294" box={[34, 620, 48, 19]} text={"6:30 AM"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#73787d","textAlign":"left"}} />
      <Copy node="258:1295" box={[22, 663, 56, 21]} text={"Duration"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:1296" box={[19.5, 687.5, 354, 48]} source={require('../../../../assets/figma/mobile/6f4c4.svg')} />
      <Copy node="258:1297" box={[34, 704, 41, 19]} text={"2 hours"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:1298" box={[20, 768, 353, 50]} source={require('../../../../assets/figma/mobile/98d17.svg')} />
      <Copy node="258:1299" box={[165, 781, 65, 24]} text={"Continue"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#ffffff","textAlign":"center"}} />
      <Surface node="258:1301" box={[121, 69, 152, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="258:1302" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/ecd92.svg')} />
      <Copy node="258:1305" box={[146, 77, 101, 27]} text={"Create Event"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="258:1306" box={[342, 539, 15, 15]} source={require('../../../../assets/figma/mobile/2090f.svg')} />
      <Artwork node="258:1307" box={[342, 622, 15, 15]} source={require('../../../../assets/figma/mobile/2090f.svg')} />
      <Artwork node="258:1308" box={[342, 705, 15, 15]} source={require('../../../../assets/figma/mobile/2090f.svg')} />
      <Artwork node="258:1310" box={[20, 320, 353, 151]} source={require('../../../../assets/figma/mobile/f9a20.png')} />
      <Link node="258:1298" box={[20, 768, 353, 50]} to="708:684" label={"Create Event - Step 3"} />
      <Link node="258:1302" box={[23, 69, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
