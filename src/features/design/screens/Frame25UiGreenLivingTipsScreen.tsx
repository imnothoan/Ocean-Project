import { GuideCatalog } from '../GuideCatalog';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 682:5379 · 25_UI_Green_Living_Tips
export function Frame25UiGreenLivingTipsScreen() {
  return (
    <Frame id="682:5379" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="682:5381" box={[121, 69, 151, 43]} fill={"#a5e0f2"} radius={20} />
      <Copy node="682:5388" box={[133, 77, 127, 27]} text={"Green living tips"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="682:5382" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/f012c.svg')} />
      <Artwork node="682:5389" box={[23, 132, 35.5, 26]} source={require('../../../../assets/figma/mobile/622b2.svg')} />
      <Copy node="682:5390" box={[35, 137, 12, 16]} text={"All"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#ffffff","textAlign":"center"}} />
      <Artwork node="682:5391" box={[66.5, 132, 47.7, 26]} source={require('../../../../assets/figma/mobile/440eb.svg')} />
      <Copy node="682:5392" box={[76, 137, 28, 16]} text={"Home"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#0186a8","textAlign":"center"}} />
      <Artwork node="682:5393" box={[122.2, 132, 44.34, 26]} source={require('../../../../assets/figma/mobile/f535c.svg')} />
      <Copy node="682:5394" box={[133, 137, 23, 16]} text={"Food"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#0186a8","textAlign":"center"}} />
      <Artwork node="682:5395" box={[174.55, 132, 49.62, 26]} source={require('../../../../assets/figma/mobile/34cbe.svg')} />
      <Copy node="682:5396" box={[185, 137, 29, 16]} text={"Travel"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#0186a8","textAlign":"center"}} />
      <Artwork node="682:5397" box={[232.16, 132, 61.03, 26]} source={require('../../../../assets/figma/mobile/60acb.svg')} />
      <Copy node="682:5398" box={[240, 137, 45, 16]} text={"Shopping"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#0186a8","textAlign":"center"}} />
      <Artwork node="682:5402" box={[23, 174, 353, 168]} radius={22} source={require('../../../../assets/figma/mobile/b459d.jpg')} />
      <Artwork node="682:5403" box={[23, 174, 353, 168]} source={require('../../../../assets/figma/mobile/354ed.svg')} />
      <Copy node="682:5406" box={[37, 257, 151, 28]} text={"Swap one bottle,"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":23,"lineHeight":28,"color":"#ffffff","textAlign":"left"}} />
      <Copy node="682:5407" box={[37, 285, 143, 28]} text={"save a hundred."} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":23,"lineHeight":28,"color":"#ffffff","textAlign":"left"}} />
      <Copy node="682:5408" box={[37, 320.03, 111, 16]} text={"2 min read · Zero waste"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":14.4,"color":"#a5e0f2","textAlign":"left"}} />
      <Link node="682:5382" box={[23, 69, 43, 43]} to="244:550" label={"20_UI_Knowledge_Hub"} />
      <GuideCatalog kind="tips"/>
    </Frame>
  );
}
