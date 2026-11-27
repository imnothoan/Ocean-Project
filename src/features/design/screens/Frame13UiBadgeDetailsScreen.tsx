import { BadgeDetailBody } from '../BadgeCollection';
import { badges } from '../badges';
import { useLiveData } from '../live';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 670:4529 · 13_UI_Badge_Details
export function Frame13UiBadgeDetailsScreen() {
  const { c } = useLiveData();
  const badge = badges.find(item=>item.title===c.values.badgeTitle) ?? badges[2];
  return (
    <Frame id="670:4529" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="670:4531" box={[121, 69, 151, 43]} fill={"#a5e0f2"} radius={20} />
      <Copy node="670:4538" box={[143, 77, 107, 27]} text={"Badge details"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="670:4532" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/b0dc5.svg')} />
      <Artwork node="670:4539" box={[19, 132, 353, 212]} source={require('../../../../assets/figma/mobile/ec9a4.svg')} />
      <Artwork node="670:4540" box={[137.5, 154, 116, 116]} source={require('../../../../assets/figma/mobile/9b885.svg')} />
      <Copy node="670:4545" box={[37, 280.02, 318, 27]} text={"Team Player"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#ffffff","textAlign":"center"}} />
      <Artwork node="670:4546" box={[125.5, 310, 140, 22]} source={require('../../../../assets/figma/mobile/4f7ed.svg')} />
      <Copy node="670:4547" box={[139.5, 313, 112, 16]} text={"EARNED · 12 OCT 2026"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#178b72","textAlign":"center"}} />
      <BadgeDetailBody badge={badge} />
      <Artwork node="1425:493" box={[312, 284, 8, 8]} source={require('../../../../assets/figma/mobile/3d944.svg')} />
      <Artwork node="1425:499" box={[115, 129, 168, 168]} source={require('../../../../assets/figma/mobile/5dd45.svg')} />
      <Artwork node="670:4544" box={[141.5, 158, 108, 108]} radius={54} source={require('../../../../assets/figma/mobile/ff600.jpg')} />
      <Link node="670:4532" box={[23, 69, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
