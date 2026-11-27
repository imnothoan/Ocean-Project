import { CampaignRecords } from '../Fundraising';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 1581:1806 · D5 - Campaign Updates
export function D5CampaignUpdatesScreen() {
  return (
    <Frame id="1581:1806" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="1581:1835" box={[105, 68, 183, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="1581:1836" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Copy node="1581:1839" box={[121, 77, 151, 26]} text={"Campaign updates"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Link node="1581:1836" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <CampaignRecords view="updates"/>
    </Frame>
  );
}
