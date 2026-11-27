import { Artwork, Copy, Footer, Frame, Link, Surface } from '../components';

// Figma 230:1093 · 1. Report type
export function Frame1ReportTypeScreen() {
  return (
    <Frame id="230:1093" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="230:2205" box={[23, 363, 345, 96]} fill={"#ffffff"} radius={15} stroke={[1,"#d8e5ec"]} shadow={[0,3,9,0,"rgba(34,87,112,0.09)"]} />
      <Copy node="230:2206" box={[122, 380, 209, 29]} text={"Rare marine species"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":17,"lineHeight":21,"color":"#091727","textAlign":"left"}} />
      <Copy node="230:2207" box={[122, 406, 218, 41]} text={"Share wildlife sightings\nresponsibly."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":13,"lineHeight":16,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="230:2208" box={[334, 400, 18, 18]} source={require('../../../../assets/figma/mobile/23a5d.svg')} />
      <Artwork node="230:2210" box={[42, 378, 60, 63]} fit="cover" source={require('../../../../assets/figma/mobile/51246.png')} />
      <Artwork node="230:2200" box={[0, 117, 393, 156]} source={require('../../../../assets/figma/mobile/26947.png')} />
      <Surface node="230:2160" box={[24, 254, 345, 96]} fill={"#ffffff"} radius={15} stroke={[1,"#d8e5ec"]} shadow={[0,3,9,0,"rgba(34,87,112,0.09)"]} />
      <Copy node="230:2176" box={[123, 270, 209, 29]} text={"Pollution & waste"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":17,"lineHeight":21,"color":"#091727","textAlign":"left"}} />
      <Copy node="230:2177" box={[123, 297, 218, 41]} text={"Report trash, spills, or\nhazardous pollution."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":13,"lineHeight":16,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="230:2178" box={[335, 291, 18, 18]} source={require('../../../../assets/figma/mobile/23a5d.svg')} />
      <Artwork node="230:2204" box={[43, 272, 60, 60]} fit="cover" source={require('../../../../assets/figma/mobile/b0953.png')} />
      <Surface node="230:4449" box={[24, 479, 345, 66]} fill={"#eaf8fb"} radius={14} />
      <Surface node="230:4450" box={[36, 490, 42, 42]} fill={"#cff3fa"} radius={21} />
      <Artwork node="230:4451" box={[47, 500, 20, 20]} source={require('../../../../assets/figma/mobile/93212.svg')} />
      <Copy node="230:4454" box={[89, 489, 265, 29]} text={"Three simple steps"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":15,"lineHeight":19,"color":"#091727","textAlign":"left"}} />
      <Copy node="230:4455" box={[89, 510, 263, 33]} text={"Capture evidence → Location → Submit"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="230:4460" box={[26, 572, 345, 66]} fill={"#e8f8f3"} radius={14} />
      <Surface node="230:4461" box={[38, 583, 42, 42]} fill={"#d0f2e4"} radius={21} />
      <Artwork node="230:4462" box={[49, 593, 20, 20]} source={require('../../../../assets/figma/mobile/58ba4.svg')} />
      <Copy node="230:4465" box={[91, 582, 265, 29]} text={"Report responsibly"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":15,"lineHeight":19,"color":"#091727","textAlign":"left"}} />
      <Copy node="230:4466" box={[91, 603, 263, 33]} text={"Stay safe and protect personal details."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="892:2997" box={[331, 59, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/e7bb5.svg')} />
      <Copy node="892:3000" box={[128, 59, 137, 40]} text={"BlueCitizen"} runs={[[0,4,"#0186a8"],[4,11,"#144957"]]} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":30,"lineHeight":36.0,"color":"#0186a8","textAlign":"center","letterSpacing":0.5}} />
      <Surface node="1639:3189" box={[59, 665, 279, 41]} fill={"#43c4d6"} radius={15} />
      <Copy node="1639:3190" box={[148, 675, 102, 21]} text={"View my reports"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#ffffff","textAlign":"left"}} />
      <Link node="230:2205" box={[23, 363, 345, 96]} to="230:1356" label={"10. Rare Species Photo"} />
      <Link node="230:2160" box={[24, 254, 345, 96]} to="230:1213" label={"2. Pollution Add Photo"} />
      <Link node="892:2992" box={[128, 59, 246, 43]} to="230:2075" label={"14. Notification Inbox"} />
      <Link node="1639:3189" box={[59, 665, 279, 41]} to="230:1379" label={"9. My Report History"} />
      <Footer top={751} />
    </Frame>
  );
}
