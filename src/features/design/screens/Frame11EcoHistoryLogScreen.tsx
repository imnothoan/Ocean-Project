import { ActivityHistory } from '../Learning';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 311:1412 · Frame 11 - Eco History Log
export function Frame11EcoHistoryLogScreen() {
  return (
    <Frame id="311:1412" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="311:1428" box={[211, 132, 160, 36]} fill={"#ffffff"} radius={20} stroke={[1,"rgba(0,0,0,0.4)"]} />
      <Copy node="311:1429" box={[259, 140, 66, 19]} text={"All Activities"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#2b2b2b","textAlign":"left"}} />
      <Artwork node="311:1430" box={[349, 147, 10.54, 6.25]} source={require('../../../../assets/figma/mobile/e83c9.svg')} />
      <Artwork node="340:6190" box={[224, 143, 20, 14.01]} source={require('../../../../assets/figma/mobile/57d7e.svg')} />
      <Surface node="311:1432" box={[22, 132, 160, 36]} fill={"#ffffff"} radius={20} stroke={[1,"rgba(0,0,0,0.4)"]} />
      <Copy node="311:1433" box={[64, 140, 49, 19]} text={"This Year"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#2b2b2b","textAlign":"left"}} />
      <Artwork node="311:1434" box={[155, 147, 10.54, 6.25]} source={require('../../../../assets/figma/mobile/e83c9.svg')} />
      <Artwork node="311:1435" box={[35, 139, 20, 20]} source={require('../../../../assets/figma/mobile/5160d.svg')} />
      <Surface node="311:1481" box={[117, 69, 160, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="311:1482" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Copy node="311:1485" box={[138, 77, 118, 26]} text={"Eco History Log"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Link node="311:1482" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <ActivityHistory top={185}/>
    </Frame>
  );
}
