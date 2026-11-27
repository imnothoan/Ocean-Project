import { GuideCatalog } from '../GuideCatalog';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 272:204 · 23_UI_Species_Library
export function Frame23UiSpeciesLibraryScreen() {
  return (
    <Frame id="272:204" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="272:206" box={[109, 69, 172, 43]} fill={"#a5e0f2"} radius={20} />
      <Copy node="272:271" box={[138, 77, 115, 27]} text={"Species library"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="272:207" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/f012c.svg')} />
      <Artwork node="272:213" box={[20, 132, 353, 42]} source={require('../../../../assets/figma/mobile/2406f.svg')} />
      <Artwork node="272:214" box={[34.58, 145.58, 15.67, 15.67]} source={require('../../../../assets/figma/mobile/7e0fa.svg')} />
      <Copy node="272:217" box={[61, 145, 120, 16]} text={"Search species or habitat"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":14.4,"color":"#7b92a1","textAlign":"left"}} />
      <Artwork node="272:218" box={[20, 184, 48, 27]} source={require('../../../../assets/figma/mobile/e8d82.svg')} />
      <Copy node="272:219" box={[38, 189, 12, 16]} text={"All"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#ffffff","textAlign":"center"}} />
      <Artwork node="272:220" box={[75, 184, 72, 27]} source={require('../../../../assets/figma/mobile/c2e59.svg')} />
      <Copy node="272:221" box={[95, 189, 33, 16]} text={"Marine"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#0186a8","textAlign":"center"}} />
      <Artwork node="272:222" box={[154, 184, 63, 27]} source={require('../../../../assets/figma/mobile/4efc2.svg')} />
      <Copy node="272:223" box={[174, 189, 24, 16]} text={"Birds"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="272:224" box={[224, 184, 83, 27]} source={require('../../../../assets/figma/mobile/37b50.svg')} />
      <Copy node="272:225" box={[243, 189, 46, 16]} text={"Mammals"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="272:226" box={[314, 184, 59, 27]} source={require('../../../../assets/figma/mobile/54a87.svg')} />
      <Copy node="272:227" box={[329, 189, 29, 16]} text={"Forest"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="272:231" box={[20, 224, 353, 157]} source={require('../../../../assets/figma/mobile/88448.jpg')} />
      <Artwork node="272:232" box={[20, 224, 353, 157]} source={require('../../../../assets/figma/mobile/32490.svg')} />
      <Copy node="272:235" box={[35, 310, 145, 31]} text={"Green sea turtle"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":23,"lineHeight":27.6,"color":"#ffffff","textAlign":"left"}} />
      <Copy node="272:236" box={[35, 341, 148, 16]} text={"A gentle guardian of the ocean"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":14.4,"color":"#ffffff","textAlign":"left"}} />
      <Artwork node="272:237" box={[258, 338, 99, 24]} source={require('../../../../assets/figma/mobile/fb7aa.svg')} />
      <Copy node="272:238" box={[274, 342, 68, 16]} text={"ENDANGERED"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#ffffff","textAlign":"center"}} />
      <Link node="272:207" box={[23, 69, 43, 43]} to="244:550" label={"20_UI_Knowledge_Hub"} />
      <Link node="272:232" box={[20, 224, 353, 157]} to="274:297" label={"24_UI_Species_Detail"} />
      <GuideCatalog kind="species"/>
    </Frame>
  );
}
