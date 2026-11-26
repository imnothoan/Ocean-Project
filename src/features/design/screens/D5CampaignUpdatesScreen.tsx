import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 1581:1806 · D5 - Campaign Updates
export function D5CampaignUpdatesScreen() {
  return (
    <Frame id="1581:1806" width={393.0} height={852} background={"#ffffff"}>
      <Copy node="1581:1808" box={[24, 119, 345, 25]} text={"Protect Phu Quoc Coral Reef"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":17,"lineHeight":22,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1809" box={[24, 151, 250, 22]} text={"$14,400 raised of $20,000"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":18,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="1581:1811" box={[24, 180, 345, 12]} fill={"#a5e0f2"} radius={6} />
      <Surface node="1581:1812" box={[24, 180, 248, 12]} fill={"#43c4d6"} radius={6} />
      <Copy node="1581:1813" box={[320, 177, 40, 20]} text={"72%"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1814" box={[24, 227, 345, 26]} text={"Updates from the organization"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":18,"lineHeight":23,"color":"#091727","textAlign":"left"}} />
      <Surface node="1581:1815" box={[24, 270, 345, 146]} fill={"#edfbff"} radius={12} />
      <Surface node="1581:1816" box={[40, 286, 88, 82]} fill={"#a5e0f2"} radius={8} />
      <Copy node="1581:1817" box={[40, 318, 88, 20]} text={"PHOTO"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"center"}} />
      <Copy node="1581:1818" box={[144, 286, 205, 20]} text={"12 Oct 2026"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1819" box={[144, 309, 205, 24]} text={"Coral reef cleanup completed"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":20,"color":"#091727","textAlign":"left"}} />
      <Copy node="1581:1820" box={[144, 337, 205, 20]} text={"We removed 320 kg of waste from the reef with our local volunteers."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="1581:1821" box={[24, 440, 345, 146]} fill={"#edfbff"} radius={12} />
      <Surface node="1581:1822" box={[40, 456, 88, 82]} fill={"#a5e0f2"} radius={8} />
      <Copy node="1581:1823" box={[40, 488, 88, 20]} text={"PHOTO"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"center"}} />
      <Copy node="1581:1824" box={[144, 456, 205, 20]} text={"28 Sep 2026"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1825" box={[144, 479, 205, 24]} text={"New cleanup area mapped"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":20,"color":"#091727","textAlign":"left"}} />
      <Copy node="1581:1826" box={[144, 507, 205, 20]} text={"Our team identified a new high-priority area for the next cleanup."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="1581:1827" box={[24, 610, 345, 146]} fill={"#edfbff"} radius={12} />
      <Surface node="1581:1828" box={[40, 626, 88, 82]} fill={"#a5e0f2"} radius={8} />
      <Copy node="1581:1829" box={[40, 658, 88, 20]} text={"PHOTO"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"center"}} />
      <Copy node="1581:1830" box={[144, 626, 205, 20]} text={"15 Sep 2026"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1831" box={[144, 649, 205, 24]} text={"Thank you to our supporters"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":20,"color":"#091727","textAlign":"left"}} />
      <Copy node="1581:1832" box={[144, 677, 205, 20]} text={"Your donations help protect marine life and restore coastal habitats."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1833" box={[24, 790, 345, 20]} text={"More updates will appear here."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"center"}} />
      <Surface node="1581:1835" box={[105, 68, 183, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="1581:1836" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Copy node="1581:1839" box={[121, 77, 151, 26]} text={"Campaign updates"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Link node="1581:1807" box={[24, 119, 345, 78]} to="1581:1458" label={"Frame 2 - Campaign Detail"} />
      <Link node="1581:1836" box={[23, 69, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
