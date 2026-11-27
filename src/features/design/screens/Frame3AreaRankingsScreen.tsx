import { AreaList } from '../Impact';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 311:579 · Frame 3 - Area Rankings
export function Frame3AreaRankingsScreen() {
  return (
    <Frame id="311:579" width={393.0} height={887.77} background={"#ffffff"}>
      <Surface node="311:4501" box={[24, 244.81, 349, 71.62]} fill={"#edfbff"} radius={10} stroke={[1,"#c9d5de"]} />
      <Artwork node="323:4518" box={[346.5, 206.5, 15, 15]} source={require('../../../../assets/figma/mobile/9d6eb.svg')} />
      <Copy node="311:684" box={[315, 204, 28, 19]} text={"Filter"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="311:686" box={[23, 195, 266, 36]} fill={"#ffffff"} radius={20} stroke={[1,"rgba(201,213,222,0.4)"]} />
      <Artwork node="311:4499" box={[41.76, 206.33, 15.32, 15.37]} source={require('../../../../assets/figma/mobile/cce71.svg')} />
      <Copy node="311:688" box={[65.22, 203, 210.06, 19]} text={"Search coastlines..."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="311:582" box={[27.98, 143, 171.51, 32]} fill={"#0186a8"} radius={25} />
      <Copy node="311:583" box={[60.89, 146, 106.7, 27]} text={"Most Polluted"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#f2f4f5","textAlign":"left"}} />
      <Copy node="311:584" box={[250.35, 146, 69.8, 27]} text={"Cleanest"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="311:691" box={[119, 69, 155, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="311:692" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Copy node="311:695" box={[140, 77, 114, 26]} text={"Area Rankings"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Link node="311:4500" box={[24, 245, 349, 72]} to="311:942" label={"Frame 7 - Area Details Metrics"} />
      <Link node="311:692" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <AreaList/>
    </Frame>
  );
}
