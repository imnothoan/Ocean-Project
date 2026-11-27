import { CampaignList } from '../Fundraising';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 1581:1359 · Frame 1 - Fundraising Campaigns
export function Frame1FundraisingCampaignsScreen() {
  return (
    <Frame id="1581:1359" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="1581:1403" box={[23, 186, 50, 32]} fill={"#43c4d6"} radius={25} stroke={[1,"#c9d5de"]} />
      <Copy node="1581:1404" box={[37, 191, 15, 20]} text={"All"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":15,"lineHeight":18.0,"color":"#091727","textAlign":"left"}} />
      <Surface node="1581:1406" box={[83, 186, 101, 32]} fill={"#f2f4f5"} radius={25} stroke={[1,"#c9d5de"]} />
      <Copy node="1581:1407" box={[105, 191, 57, 20]} text={"Cleanups"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":15,"lineHeight":18.0,"color":"#091727","textAlign":"center"}} />
      <Surface node="1581:1409" box={[194, 186, 81, 32]} fill={"#f2f4f5"} radius={25} stroke={[1,"#c9d5de"]} />
      <Copy node="1581:1410" box={[212, 191, 45, 20]} text={"Wildlife"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":15,"lineHeight":18.0,"color":"#091727","textAlign":"center"}} />
      <Surface node="1581:1412" box={[285, 186, 62, 32]} fill={"#f2f4f5"} radius={25} stroke={[1,"#c9d5de"]} />
      <Copy node="1581:1413" box={[301, 191, 33, 20]} text={"Reefs"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":15,"lineHeight":18.0,"color":"#091727","textAlign":"center"}} />
      <Surface node="1581:1415" box={[357, 186, 62, 32]} fill={"#f2f4f5"} radius={25} stroke={[1,"#c9d5de"]} />
      <Copy node="1581:1416" box={[371, 191, 37, 20]} text={"XXXX"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":15,"lineHeight":18.0,"color":"#091727","textAlign":"center"}} />
      <Artwork node="1581:1419" box={[345.5, 152.5, 15, 15]} source={require('../../../../assets/figma/mobile/9d6eb.svg')} />
      <Copy node="1581:1420" box={[314, 150, 28, 19]} text={"Filter"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="1581:1422" box={[22, 141, 266, 36]} fill={"#ffffff"} radius={20} stroke={[1,"rgba(201,213,222,0.4)"]} />
      <Artwork node="1581:1423" box={[40.76, 152.33, 15.32, 15.37]} source={require('../../../../assets/figma/mobile/cce71.svg')} />
      <Copy node="1581:1424" box={[64.22, 149, 210.06, 19]} text={"Search coastlines..."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="1581:1426" box={[102, 69, 190, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="1581:1427" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Copy node="1581:1430" box={[121, 77, 154, 26]} text={"Donate Campaigns"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="1581:1432" box={[321, 74, 32, 32]} fill={"#ffffff"} radius={16} stroke={[2,"#2b2b2b"]} />
      <Artwork node="1581:1433" box={[327, 80, 20, 20]} source={require('../../../../assets/figma/mobile/ddf08.svg')} />
      <Copy node="1581:1437" box={[288, 109, 91, 21]} text={"Your Donation"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":19.2,"color":"#3f596b","textAlign":"right","fontStyle":"italic"}} />
      <Link node="1581:1427" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <Link node="1581:1431" box={[288, 74, 91, 56]} to="1581:1920" label={"D7 - Donation History"} />
      <CampaignList/>
    </Frame>
  );
}
