import { CampaignRecords } from '../Fundraising';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 1581:1516 · Frame 3 - Top Donors
export function Frame3TopDonorsScreen() {
  return (
    <Frame id="1581:1516" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="1581:1576" box={[133, 69, 130, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="1581:1577" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Copy node="1581:1580" box={[153, 77, 90, 26]} text={"Top Donors"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Link node="1581:1577" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <CampaignRecords view="supporters"/>
    </Frame>
  );
}
