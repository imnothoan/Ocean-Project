import { ContributionList } from '../Fundraising';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 1581:1920 · D7 - Donation History
export function D7DonationHistoryScreen() {
  return (
    <Frame id="1581:1920" width={393.0} height={852} background={"#ffffff"}>
      <Copy node="1581:1921" box={[24, 119, 345, 22]} text={"Your contribution"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":18,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="1581:1922" box={[24, 145, 345, 108]} fill={"#edfbff"} radius={12} stroke={[1,"#c9d5de"]} />
      <Copy node="1581:1923" box={[40, 162, 145, 35]} text={"$186"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":27,"lineHeight":33,"color":"#0186a8","textAlign":"left"}} />
      <Copy node="1581:1924" box={[40, 201, 145, 21]} text={"Total contributed"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":13,"lineHeight":17,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1925" box={[232, 162, 105, 35]} text={"42 kg"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":27,"lineHeight":33,"color":"#091727","textAlign":"right"}} />
      <Copy node="1581:1926" box={[232, 201, 105, 21]} text={"Waste removed"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":13,"lineHeight":17,"color":"#3f596b","textAlign":"right"}} />
      <Copy node="1581:1927" box={[24, 280, 120, 24]} text={"Filter by time"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":21,"color":"#091727","textAlign":"left"}} />
      <Surface node="1581:1928" box={[24, 313, 108, 40]} fill={"#0186a8"} radius={20} stroke={[1,"#c9d5de"]} />
      <Copy node="1581:1929" box={[24, 324, 108, 21]} text={"All time"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":13,"lineHeight":17,"color":"#ffffff","textAlign":"center"}} />
      <Surface node="1581:1930" box={[142, 313, 108, 40]} fill={"#ffffff"} radius={20} stroke={[1,"#c9d5de"]} />
      <Copy node="1581:1931" box={[142, 324, 108, 21]} text={"This year"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":13,"lineHeight":17,"color":"#3f596b","textAlign":"center"}} />
      <Surface node="1581:1932" box={[260, 313, 109, 40]} fill={"#ffffff"} radius={20} stroke={[1,"#c9d5de"]} />
      <Copy node="1581:1933" box={[260, 324, 109, 21]} text={"Custom"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":13,"lineHeight":17,"color":"#3f596b","textAlign":"center"}} />
      <Copy node="1581:1934" box={[24, 381, 345, 26]} text={"Transactions"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":18,"lineHeight":23,"color":"#091727","textAlign":"left"}} />
      <Surface node="1581:1961" box={[112, 68, 175, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="1581:1962" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Copy node="1581:1965" box={[134, 77, 131, 26]} text={"Donation history"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Link node="1581:1962" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <ContributionList/>
    </Frame>
  );
}
