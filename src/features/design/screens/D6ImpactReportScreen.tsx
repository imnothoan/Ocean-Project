import { CampaignRecords } from '../Fundraising';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 1581:1860 · D6 - Impact Report
export function D6ImpactReportScreen() {
  return (
    <Frame id="1581:1860" width={393.0} height={852} background={"#ffffff"}>
      <Artwork node="1581:1894" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Surface node="1581:1898" box={[122, 68, 150, 43]} fill={"#a5e0f2"} radius={20} />
      <Copy node="1581:1899" box={[143, 77, 109, 26]} text={"Impact report"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Link node="1581:1894" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <CampaignRecords view="impact"/>
    </Frame>
  );
}
