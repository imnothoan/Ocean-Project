import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 1581:1711 · D3 - Donation Confirmation
export function D3DonationConfirmationScreen() {
  return (
    <Frame id="1581:1711" width={393.0} height={852} background={"#ffffff"}>
      <Copy node="1581:1712" box={[24, 119, 345, 23]} text={"Review your donation details"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":15,"lineHeight":20,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="1581:1713" box={[24, 157, 345, 420]} fill={"#edfbff"} radius={12} />
      <Copy node="1581:1714" box={[40, 181, 140, 22]} text={"Campaign"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":18,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1715" box={[40, 203, 305, 24]} text={"Protect Phu Quoc Coral Reef"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":21,"color":"#091727","textAlign":"left"}} />
      <Surface node="1581:1716" box={[40, 236, 313, 1]} fill={"#c9d5de"} />
      <Copy node="1581:1717" box={[40, 249, 140, 22]} text={"Organization"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":18,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1718" box={[40, 271, 305, 24]} text={"XXX Vietnam"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":21,"color":"#091727","textAlign":"left"}} />
      <Surface node="1581:1719" box={[40, 304, 313, 1]} fill={"#c9d5de"} />
      <Copy node="1581:1721" box={[40, 317, 140, 22]} text={"Amount"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":18,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1722" box={[40, 339, 305, 24]} text={"$20.00"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":21,"color":"#091727","textAlign":"left"}} />
      <Surface node="1581:1723" box={[40, 372, 313, 1]} fill={"#c9d5de"} />
      <Copy node="1581:1725" box={[40, 385, 140, 22]} text={"Payment method"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":18,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1726" box={[40, 407, 305, 24]} text={"MoMo"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":21,"color":"#091727","textAlign":"left"}} />
      <Surface node="1581:1727" box={[40, 440, 313, 1]} fill={"#c9d5de"} />
      <Copy node="1581:1728" box={[40, 453, 140, 22]} text={"Estimated impact"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":18,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1729" box={[40, 475, 305, 24]} text={"50 kg of waste removed"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":21,"color":"#091727","textAlign":"left"}} />
      <Surface node="1581:1730" box={[40, 513, 313, 1]} fill={"#c9d5de"} />
      <Copy node="1581:1731" box={[40, 531, 120, 24]} text={"Total"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":21,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1732" box={[245, 527, 108, 30]} text={"$20.00"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":22,"lineHeight":28,"color":"#091727","textAlign":"right"}} />
      <Surface node="1581:1733" box={[24, 613, 345, 48]} fill={"#43c4d6"} radius={28} />
      <Copy node="1581:1734" box={[24, 620, 345, 30]} text={"Confirm donation"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":19,"lineHeight":30,"color":"#ffffff","textAlign":"center"}} />
      <Copy node="1581:1735" box={[36, 690, 321, 20]} text={"Your information is protected and used only to process this donation."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":17,"color":"#3f596b","textAlign":"center"}} />
      <Surface node="1581:1736" box={[160, 742, 73, 28]} fill={"#a5e0f2"} radius={14} />
      <Copy node="1581:1737" box={[160, 747, 73, 20]} text={"Secure"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"center"}} />
      <Surface node="1581:1739" box={[109, 68, 175, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="1581:1740" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Copy node="1581:1743" box={[130, 77, 140, 26]} text={"Confirm donation"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Link node="1581:1720" box={[40, 317, 305, 46]} to="1581:1601" label={"D1 - Donate"} />
      <Link node="1581:1724" box={[40, 385, 305, 46]} to="1581:1655" label={"D2 - Payment Method"} />
      <Link node="1581:1733" box={[24, 613, 345, 48]} to="1581:1764" label={"D4 - Donation Success"} />
      <Link node="1581:1740" box={[23, 69, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
