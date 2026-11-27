import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 258:1177 · Event Check-in Completed
export function EventCheckInCompletedScreen() {
  return (
    <Frame id="258:1177" width={393.0} height={852} background={"#ffffff"}>
      <Copy node="258:1181" box={[96.5, 294, 198, 37]} text={"You're checked in!"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":28,"lineHeight":33.6,"color":"#202326","textAlign":"center"}} />
      <Copy node="258:1182" box={[87, 336, 219, 21]} text={"Have a meaningful day by the sea."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"center"}} />
      <Artwork node="258:1183" box={[19.5, 402.5, 354, 116]} source={require('../../../../assets/figma/mobile/17966.svg')} />
      <Copy node="258:1184" box={[36, 417, 163, 24]} text={"My Khe Beach Cleanup"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#202326","textAlign":"left"}} />
      <Copy node="258:1185" box={[36, 444, 127, 19]} text={"Checked in at 6:18 AM"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:1186" box={[35.5, 471.5, 322, 1]} source={require('../../../../assets/figma/mobile/3ae70.svg')} />
      <Copy node="258:1187" box={[36, 486, 77, 19]} text={"Participant ID"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#73787d","textAlign":"left"}} />
      <Copy node="258:1188" box={[284, 485, 73, 19]} text={"EVT-2048-AN"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":16.8,"color":"#0186a8","textAlign":"right"}} />
      <Copy node="258:1189" box={[20, 543, 99, 27]} text={"Today's goal"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#202326","textAlign":"left"}} />
      <Artwork node="258:1190" box={[20, 579, 353, 76]} source={require('../../../../assets/figma/mobile/0af07.svg')} />
      <Copy node="258:1191" box={[36, 592, 157, 24]} text={"Collect and sort waste"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#202326","textAlign":"left"}} />
      <Copy node="258:1192" box={[36, 618, 245, 21]} text={"Together, we can keep the coast clean."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:1193" box={[20, 768, 353, 50]} source={require('../../../../assets/figma/mobile/fbbd3.svg')} />
      <Copy node="258:1194" box={[142, 780, 110, 24]} text={"View certificate"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#ffffff","textAlign":"center"}} />
      <Surface node="258:1196" box={[146, 69, 101, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="258:1197" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/ecd92.svg')} />
      <Artwork node="258:1200" box={[324, 69, 43, 43]} source={require('../../../../assets/figma/mobile/acbd8.svg')} />
      <Artwork node="258:1202" box={[334, 79, 24, 24]} source={require('../../../../assets/figma/mobile/57e4f.svg')} />
      <Copy node="258:1203" box={[163, 72, 68, 27]} text={"Check-in"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="1704:2755" box={[139, 162, 114, 114]} source={require('../../../../assets/figma/mobile/456fb.svg')} />
      <Copy node="258:1205" box={[174, 94, 45, 13]} text={"Completed"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":10,"lineHeight":12.0,"color":"#3f596b","textAlign":"left"}} />
      <Link node="258:1193" box={[20, 768, 353, 50]} to="258:1450" label={"Event Certificate"} />
      <Link node="258:1197" box={[23, 69, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
