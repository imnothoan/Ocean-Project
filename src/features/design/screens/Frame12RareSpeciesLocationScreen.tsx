import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 230:2121 · 12. Rare Species Location
export function Frame12RareSpeciesLocationScreen() {
  return (
    <Frame id="230:2121" width={393.0} height={852} background={"#ffffff"}>
      <Copy node="230:2123" box={[46.5, 400, 11, 15]} text={"All"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":11,"lineHeight":13.2,"color":"#ffffff","textAlign":"center"}} />
      <Copy node="255:824" box={[24, 117, 107, 20]} text={"STEP 3 / 4"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="255:825" box={[229, 117, 140, 20]} text={"RARE SPECIES"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"right"}} />
      <Surface node="255:826" box={[24, 143, 345, 5]} fill={"#e6f3f8"} radius={3} />
      <Copy node="255:827" box={[24, 159, 345, 36]} text={"Where did you see it?"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":23,"lineHeight":28.75,"color":"#091727","textAlign":"left"}} />
      <Copy node="255:828" box={[24, 187, 345, 35]} text={"Exact wildlife locations are kept private."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":17.5,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="255:829" box={[24, 217, 345, 41]} fill={"#ffffff"} radius={10} stroke={[1,"#d8e5ec"]} />
      <Artwork node="255:830" box={[35, 226, 21, 21]} source={require('../../../../assets/figma/mobile/b04f0.svg')} />
      <Copy node="255:833" box={[66, 227, 289, 30]} text={"Search address or place"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":13,"lineHeight":16.25,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="255:858" box={[24, 462, 335, 20]} text={"SIGHTING DATE & TIME"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="255:859" box={[24, 485, 345, 42]} fill={"#ffffff"} radius={11} stroke={[1,"#d8e5ec"]} />
      <Copy node="255:860" box={[37, 496, 318, 28]} text={"13 Oct 2026 • 09:45"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":17.5,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="255:861" box={[24, 535, 331, 30]} text={"BEHAVIOR / NOTES"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="255:862" box={[24, 556, 345, 67]} fill={"#ffffff"} radius={11} stroke={[1,"#d8e5ec"]} />
      <Copy node="255:863" box={[36, 566, 321, 57]} text={"Swimming near the reef, appeared healthy.\nNo contact or disturbance."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":13,"lineHeight":16.25,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="255:864" box={[24, 629, 345, 57]} fill={"#eaf8fb"} radius={13} />
      <Surface node="255:865" box={[36, 636, 43, 43]} fill={"#cff4fa"} radius={22} />
      <Artwork node="255:866" box={[47, 647, 21, 21]} source={require('../../../../assets/figma/mobile/dc501.svg')} />
      <Copy node="255:869" box={[89, 638, 258, 30]} text={"Protected location"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":15,"lineHeight":18.75,"color":"#091727","textAlign":"left"}} />
      <Copy node="255:870" box={[89, 661, 263, 6]} text={"Public views hide the exact coordinates."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="255:871" box={[24, 729, 345, 46]} fill={"#43c4d6"} radius={23} />
      <Copy node="255:872" box={[29, 740, 335, 27]} text={"Review sighting"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":20,"color":"#ffffff","textAlign":"center"}} />
      <Surface node="255:874" box={[24, 143, 258.75, 5]} fill={"#43c4d6"} radius={3} />
      <Artwork node="255:880" box={[24, 269, 345, 184]} source={require('../../../../assets/figma/mobile/96a08.png')} />
      <Surface node="892:2928" box={[101, 67, 187, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="892:2929" box={[23, 66, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/7330f.svg')} />
      <Artwork node="892:2932" box={[331, 66, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/9fd81.svg')} />
      <Artwork node="892:2934" box={[340, 77, 26.27, 24]} source={require('../../../../assets/figma/mobile/c9b94.svg')} />
      <Copy node="892:2935" box={[113, 75, 165, 27]} text={"Report Rare Species"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"center"}} />
      <Link node="255:871" box={[24, 729, 345, 46]} to="230:2098" label={"13. Rare Species Review"} />
      <Link node="892:2929" box={[23, 66, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
