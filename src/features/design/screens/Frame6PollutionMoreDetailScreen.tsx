import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 230:1333 · 6. Pollution More Detail
export function Frame6PollutionMoreDetailScreen() {
  return (
    <Frame id="230:1333" width={393.0} height={852} background={"#ffffff"}>
      <Artwork node="230:1333" box={[0, 0, 393, 852]} source={require('../../../../assets/figma/mobile/58c51.svg')} />
      <Copy node="242:4961" box={[24, 163, 183, 36]} text={"Add more details"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":23,"lineHeight":28.75,"color":"#091727","textAlign":"left"}} />
      <Surface node="242:4957" box={[24, 143, 345, 5]} fill={"#e6f3f8"} radius={3} />
      <Copy node="242:4955" box={[292, 117, 77, 20]} text={"POLLUTION"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"right"}} />
      <Copy node="242:4953" box={[24, 117, 84, 20]} text={"STEP 5 / 6"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="242:4959" box={[24, 143, 287.5, 5]} fill={"#43c4d6"} radius={3} />
      <Copy node="242:4963" box={[24, 199, 345, 35]} text={"Your description makes the report actionable."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":17.5,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="242:4965" box={[24, 240, 345, 30]} text={"WHAT DID YOU OBSERVE?"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="242:4967" box={[24, 264, 345, 139]} fill={"#ffffff"} radius={12} />
      <Copy node="242:4968" box={[37, 278, 317, 115]} text={"Plastic bottles and bags washed up along\nthe shore. Waste covers part of the beach,\nespecially near the rocks."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":15,"lineHeight":18.75,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="242:4970" box={[24, 424, 335, 20]} text={"ESTIMATED AMOUNT"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="242:4972" box={[24, 447, 345, 46]} fill={"#ffffff"} radius={11} />
      <Copy node="242:4973" box={[37, 458, 318, 32]} text={"Around two trash bags (optional)"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":17.5,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="242:4975" box={[24, 515, 335, 20]} text={"WHEN DID YOU NOTICE IT?"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="242:4977" box={[24, 538, 345, 46]} fill={"#ffffff"} radius={11} />
      <Copy node="242:4978" box={[37, 549, 318, 32]} text={"Today, 09:30 AM"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":17.5,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="242:4980" box={[24, 602, 345, 68]} fill={"#eaf8fb"} radius={13} />
      <Surface node="242:4981" box={[36, 614, 43, 43]} fill={"#cff4fa"} radius={22} />
      <Artwork node="242:4982" box={[47, 625, 21, 21]} source={require('../../../../assets/figma/mobile/dc501.svg')} />
      <Copy node="242:4985" box={[89, 616, 258, 30]} text={"Privacy reminder"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":15,"lineHeight":18.75,"color":"#091727","textAlign":"left"}} />
      <Copy node="242:4986" box={[89, 637, 263, 34]} text={"Avoid names, phone numbers, or faces."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="242:4988" box={[23, 725, 345, 46]} fill={"#43c4d6"} radius={23} />
      <Copy node="242:4989" box={[28, 736, 335, 27]} text={"Review report"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":20,"color":"#ffffff","textAlign":"center"}} />
      <Surface node="892:3084" box={[113, 67, 175, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="892:3085" box={[23, 66, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/7330f.svg')} />
      <Artwork node="892:3088" box={[332, 66, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/9fd81.svg')} />
      <Artwork node="892:3090" box={[340, 75, 26.27, 24]} source={require('../../../../assets/figma/mobile/c9b94.svg')} />
      <Copy node="892:3091" box={[129, 75, 139, 27]} text={"Report Pollution"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"center"}} />
      <Link node="242:4988" box={[23, 725, 345, 46]} to="230:1425" label={"7. Pollution Review"} />
      <Link node="892:3085" box={[23, 66, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
