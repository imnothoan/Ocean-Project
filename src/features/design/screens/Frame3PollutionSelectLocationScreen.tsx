import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 230:1237 · 3. Pollution Select Location
export function Frame3PollutionSelectLocationScreen() {
  return (
    <Frame id="230:1237" width={393.0} height={852} background={"#ffffff"}>
      <Artwork node="230:1237" box={[0, 0, 393, 852]} source={require('../../../../assets/figma/mobile/58c51.svg')} />
      <Copy node="242:4750" box={[25, 514, 115, 20]} text={"SELECTED LOCATION"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="242:4708" box={[24, 197, 200, 22]} text={"Search for the site or adjust the pin."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":18,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="230:1239" box={[46.5, 400, 11, 15]} text={"All"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":11,"lineHeight":13.2,"color":"#ffffff","textAlign":"center"}} />
      <Copy node="242:4695" box={[24, 119, 74, 20]} text={"STEP 2 / 6"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="242:4696" box={[229, 119, 140, 20]} text={"POLLUTION"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"right"}} />
      <Surface node="242:4697" box={[24, 145, 345, 5]} fill={"#e6f3f8"} radius={3} />
      <Surface node="242:4698" box={[24, 145, 115, 5]} fill={"#43c4d6"} radius={3} />
      <Copy node="242:4699" box={[24, 164, 170, 35]} text={"Mark the location"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":23,"lineHeight":29,"color":"#091727","textAlign":"left"}} />
      <Surface node="242:4710" box={[23, 225, 345, 43]} fill={"#ffffff"} radius={11} />
      <Artwork node="242:4711" box={[35, 235, 21, 21]} source={require('../../../../assets/figma/mobile/b04f0.svg')} />
      <Copy node="242:4714" box={[67, 237, 287, 29]} text={"Search address or place"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":18,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="242:4741" box={[24, 287, 353, 214]} source={require('../../../../assets/figma/mobile/96a08.png')} />
      <Surface node="242:4752" box={[22, 539, 345, 43]} fill={"#ffffff"} radius={11} />
      <Copy node="242:4753" box={[35, 552, 202, 17]} text={"My Khe Beach, Son Tra, Da Nang"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":18,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="242:4758" box={[24, 596, 345, 67]} fill={"#eaf8fb"} radius={14} />
      <Surface node="242:4759" box={[36, 607, 42, 42]} fill={"#cff3fa"} radius={21} />
      <Artwork node="242:4760" box={[47, 617, 20, 20]} source={require('../../../../assets/figma/mobile/93212.svg')} />
      <Copy node="242:4763" box={[89, 606, 265, 29]} text={"Location privacy"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":15,"lineHeight":19,"color":"#091727","textAlign":"left"}} />
      <Copy node="242:4764" box={[89, 627, 263, 34]} text={"Only reviewers see the precise coordinates."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="242:4769" box={[22, 732, 345, 47]} fill={"#43c4d6"} radius={23} />
      <Copy node="242:4770" box={[34, 744, 321, 28]} text={"Confirm location"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":20,"color":"#ffffff","textAlign":"center"}} />
      <Surface node="892:3045" box={[113, 67, 175, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="892:3046" box={[23, 66, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/7330f.svg')} />
      <Artwork node="892:3049" box={[332, 66, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/9fd81.svg')} />
      <Artwork node="892:3051" box={[340, 75, 26.27, 24]} source={require('../../../../assets/figma/mobile/c9b94.svg')} />
      <Copy node="892:3052" box={[129, 75, 139, 27]} text={"Report Pollution"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"center"}} />
      <Link node="242:4769" box={[22, 732, 345, 47]} to="230:1261" label={"4. Pollution Severity"} />
      <Link node="892:3046" box={[23, 66, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
