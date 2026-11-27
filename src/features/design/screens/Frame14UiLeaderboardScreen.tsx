import { Ranking } from '../Learning';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 238:299 · 14_UI_Leaderboard
export function Frame14UiLeaderboardScreen() {
  return (
    <Frame id="238:299" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="238:301" box={[121, 69, 151, 43]} fill={"#a5e0f2"} radius={20} />
      <Copy node="238:308" box={[146, 77, 101, 27]} text={"Leaderboard"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="238:302" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/b0dc5.svg')} />
      <Artwork node="238:309" box={[23, 134, 108, 32]} source={require('../../../../assets/figma/mobile/59da4.svg')} />
      <Copy node="238:310" box={[50, 141, 55, 19]} text={"This week"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":16.8,"color":"#ffffff","textAlign":"center"}} />
      <Artwork node="238:311" box={[139, 134, 108, 32]} source={require('../../../../assets/figma/mobile/31c8e.svg')} />
      <Copy node="238:312" box={[163, 141, 61, 19]} text={"This month"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":16.8,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="238:313" box={[255, 134, 121, 32]} source={require('../../../../assets/figma/mobile/b3bb9.svg')} />
      <Copy node="238:314" box={[295, 141, 42, 19]} text={"All time"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":16.8,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="1278:235" box={[294, 160, 99, 100]} source={require('../../../../assets/figma/mobile/2d12f.svg')} />
      <Link node="238:302" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <Ranking/>
    </Frame>
  );
}
