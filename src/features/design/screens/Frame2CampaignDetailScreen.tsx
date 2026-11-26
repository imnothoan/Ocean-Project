import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 1581:1458 · Frame 2 - Campaign Detail
export function Frame2CampaignDetailScreen() {
  return (
    <Frame id="1581:1458" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="1581:1460" box={[36, 599, 315, 43]} fill={"#43c4d6"} radius={24} />
      <Copy node="1581:1461" box={[134, 605, 119, 32]} text={"Donate Now"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":24,"lineHeight":28.8,"color":"#ffffff","textAlign":"center"}} />
      <Copy node="1581:1463" box={[32.31, 470.08, 167.06, 22.24]} text={"About Campaign"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":15,"lineHeight":18.0,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1464" box={[32, 493, 319, 48]} text={"Phu Quoc's coral reefs are facing severe threats from marine debris and discarded nets. Funds will go directly to dive teams clearing debris and replanting coral nurseries..."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":14.4,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1466" box={[260, 473, 94, 19]} text={"List of supporters"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="1581:1468" box={[97, 396, 1, 32]} fill={"#c9d5de"} />
      <Copy node="1581:1470" box={[106, 387, 259, 30]} text={"Every $2 removes kg of waste & restores coral"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":19,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1471" box={[106, 420, 179, 19]} text={"$2.00               5kg Trash Removal "} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="1581:1472" box={[38, 387, 50, 50]} source={require('../../../../assets/figma/mobile/38a84.svg')} />
      <Artwork node="1581:1473" box={[47, 397, 32, 32]} source={require('../../../../assets/figma/mobile/806b3.svg')} />
      <Artwork node="1581:1474" box={[146, 422, 24, 15]} source={require('../../../../assets/figma/mobile/ccb32.svg')} />
      <Surface node="1581:1477" box={[41, 326, 309, 15]} fill={"#76d0c1"} radius={25} />
      <Surface node="1581:1478" box={[41, 326, 229, 15]} fill={"#178b72"} radius={25} />
      <Copy node="1581:1479" box={[244, 325, 22, 16]} text={"72%"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#a5e0f2","textAlign":"left"}} />
      <Copy node="1581:1480" box={[40, 306, 216, 19]} text={"72% Raised / $14,400 of $20,000 Goal"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":16.8,"color":"#091727","textAlign":"left"}} />
      <Copy node="1581:1481" box={[41, 343, 85, 19]} text={"542 Supporters"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1482" box={[284, 343, 66, 19]} text={"12 days left"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#3f596b","textAlign":"right"}} />
      <Surface node="1581:1485" box={[23, 130, 349, 158]} fill={"#edfbff"} radius={10} />
      <Artwork node="1581:1486" box={[41, 148, 89, 121]} radius={5} />
      <Copy node="1581:1487" box={[147, 150, 88, 20]} text={"Reefs & Urgent"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":15,"lineHeight":18.0,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1488" box={[147, 214, 118, 24]} text={"by XXX Vietnam"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":18,"lineHeight":21.6,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1489" box={[148, 174, 202, 40]} text={"Protect Phu Quoc Coral Reef"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":20,"color":"#091727","textAlign":"left"}} />
      <Surface node="1581:1491" box={[109, 68, 175, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="1581:1492" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Copy node="1581:1495" box={[130, 77, 135, 26]} text={"Campaign Detail"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Link node="1581:1459" box={[36, 599, 315, 43]} to="1581:1601" label={"D1 - Donate"} />
      <Link node="1581:1466" box={[260, 473, 94, 19]} to="1581:1516" label={"Frame 3 - Top Donors"} />
      <Link node="1581:1475" box={[23, 306, 349, 60]} to="1581:1806" label={"D5 - Campaign Updates"} />
      <Link node="1581:1492" box={[23, 69, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
