import { GuideCatalog } from '../GuideCatalog';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 263:2582 · 21_UI_Waste_Sorting_Guide
export function Frame21UiWasteSortingGuideScreen() {
  return (
    <Frame id="263:2582" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="263:2584" box={[112, 69, 167, 43]} fill={"#a5e0f2"} radius={20} />
      <Copy node="263:2591" box={[142, 77, 108, 27]} text={"Waste sorting"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="263:2585" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/f012c.svg')} />
      <Artwork node="263:2592" box={[20, 140, 353, 42]} source={require('../../../../assets/figma/mobile/2406f.svg')} />
      <Artwork node="263:2593" box={[34.58, 153.58, 15.67, 15.67]} source={require('../../../../assets/figma/mobile/7e0fa.svg')} />
      <Copy node="263:2596" box={[61, 153, 72, 16]} text={"Search an item"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":14.4,"color":"#7b92a1","textAlign":"left"}} />
      <Artwork node="263:2597" box={[346.45, 153.85, 14.09, 12.11]} source={require('../../../../assets/figma/mobile/b60d9.svg')} />
      <Copy node="263:2601" box={[20, 194, 126, 23]} text={"Choose a category"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":17,"lineHeight":20.4,"color":"#091727","textAlign":"left"}} />
      <Link node="263:2585" box={[23, 69, 43, 43]} to="244:550" label={"20_UI_Knowledge_Hub"} />
      <GuideCatalog kind="waste"/>
    </Frame>
  );
}
