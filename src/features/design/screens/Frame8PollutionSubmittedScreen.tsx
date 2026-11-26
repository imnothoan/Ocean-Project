import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 230:1402 · 8. Pollution Submitted
export function Frame8PollutionSubmittedScreen() {
  return (
    <Frame id="230:1402" width={393.0} height={852} background={"#ffffff"}>
      <Artwork node="230:1402" box={[0, 0, 393, 852]} source={require('../../../../assets/figma/mobile/58c51.svg')} />
      <Surface node="250:407" box={[29, 375, 345, 71]} fill={"#eaf8fb"} radius={13} />
      <Surface node="250:408" box={[41, 390, 42, 42]} fill={"#ffffff"} radius={21} />
      <Artwork node="250:409" box={[52, 401, 20, 20]} source={require('../../../../assets/figma/mobile/474c6.svg')} />
      <Copy node="250:412" box={[93, 388, 199, 30]} text={"REPORT ID  RP-2026-0142"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":20,"color":"#0186a8","textAlign":"left"}} />
      <Copy node="250:413" box={[93, 411, 267, 30]} text={"Current status: Pending review"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":13,"lineHeight":16.25,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="230:1404" box={[46.5, 400, 11, 15]} text={"All"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":11,"lineHeight":13.2,"color":"#ffffff","textAlign":"center"}} />
      <Copy node="242:5261" box={[23, 326, 345, 37]} text={"Thank you for taking action!"} typeStyle={{"fontFamily":"Inter_700Bold","fontSize":25,"lineHeight":31.25,"color":"#091727","textAlign":"center"}} />
      <Artwork node="242:5286" box={[27, 137, 338, 172]} source={require('../../../../assets/figma/mobile/9d210.png')} radius={11} />
      <Surface node="250:417" box={[29, 452, 345, 152]} fill={"#ffffff"} radius={13} />
      <Surface node="250:418" box={[58, 484, 2, 94]} fill={"#a7deeb"} />
      <Surface node="250:419" box={[49, 468, 19, 19]} fill={"#0186a8"} radius={10} />
      <Artwork node="250:420" box={[53, 472, 11, 11]} source={require('../../../../assets/figma/mobile/5d241.svg')} />
      <Copy node="250:422" box={[81, 464, 265, 30]} text={"Submitted"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":14,"lineHeight":17.5,"color":"#091727","textAlign":"left"}} />
      <Copy node="250:423" box={[81, 485, 263, 30]} text={"Just now"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="250:424" box={[49, 515, 19, 19]} fill={"#ffffff"} radius={10} />
      <Copy node="250:425" box={[81, 511, 265, 30]} text={"Under review"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":14,"lineHeight":17.5,"color":"#091727","textAlign":"left"}} />
      <Copy node="250:426" box={[81, 532, 263, 30]} text={"Review pending"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="250:427" box={[49, 562, 19, 19]} fill={"#ffffff"} radius={10} />
      <Copy node="250:428" box={[81, 558, 265, 30]} text={"Status updated"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":14,"lineHeight":17.5,"color":"#091727","textAlign":"left"}} />
      <Copy node="250:429" box={[81, 579, 263, 30]} text={"We'll notify you"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="250:434" box={[27, 655, 345, 46]} fill={"#a5e0f2"} radius={23} />
      <Copy node="250:435" box={[32, 666, 335, 27]} text={"Create another report"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":20,"color":"#091727","textAlign":"center"}} />
      <Surface node="250:437" box={[27, 722, 345, 46]} fill={"#43c4d6"} radius={23} />
      <Copy node="250:438" box={[32, 733, 335, 27]} text={"Track this report"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":20,"color":"#ffffff","textAlign":"center"}} />
      <Artwork node="258:3849" box={[322, 146, 35, 35]} source={require('../../../../assets/figma/mobile/3434d.svg')} />
      <Artwork node="258:3850" box={[327, 151, 25, 25]} source={require('../../../../assets/figma/mobile/cd436.svg')} />
      <Surface node="892:2834" box={[113, 67, 175, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="892:2835" box={[23, 66, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/7330f.svg')} />
      <Artwork node="892:2838" box={[332, 66, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/9fd81.svg')} />
      <Artwork node="892:2840" box={[340, 75, 26.27, 24]} source={require('../../../../assets/figma/mobile/c9b94.svg')} />
      <Copy node="892:2841" box={[129, 75, 139, 27]} text={"Report Submitted"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="1253:3035" box={[332, 156, 16, 16]} source={require('../../../../assets/figma/mobile/eb9e2.svg')} />
      <Link node="250:434" box={[27, 655, 345, 46]} to="230:1093" label={"1. Report type"} />
      <Link node="250:437" box={[27, 722, 345, 46]} to="1249:216" label={"16. Report Status Tracker"} />
      <Link node="892:2835" box={[23, 66, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
