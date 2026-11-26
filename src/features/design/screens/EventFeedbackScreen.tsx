import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 258:1500 · Event Feedback
export function EventFeedbackScreen() {
  return (
    <Frame id="258:1500" width={393.0} height={852} background={"#ffffff"}>
      <Artwork node="258:1500" box={[0, 0, 393, 852]} source={require('../../../../assets/figma/mobile/58c51.svg')} />
      <Copy node="258:1502" box={[32.5, 144, 327, 32]} text={"How was your cleanup experience?"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":24,"lineHeight":28.8,"color":"#202326","textAlign":"center"}} />
      <Copy node="258:1503" box={[54, 182, 285, 21]} text={"Your feedback helps our community improve."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"center"}} />
      <Copy node="258:1504" box={[20, 292, 182, 24]} text={"What did you enjoy most?"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#202326","textAlign":"left"}} />
      <Artwork node="258:1505" box={[20, 324, 98, 30]} source={require('../../../../assets/figma/mobile/96fd3.svg')} />
      <Copy node="258:1506" box={[32.5, 329, 73, 19]} text={"Organization"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":16.8,"color":"#ffffff","textAlign":"center"}} />
      <Artwork node="258:1507" box={[125, 324, 106, 30]} source={require('../../../../assets/figma/mobile/01225.svg')} />
      <Copy node="258:1508" box={[148.5, 329, 58, 19]} text={"Teamwork"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":16.8,"color":"#73787d","textAlign":"center"}} />
      <Artwork node="258:1509" box={[238, 324, 113, 30]} source={require('../../../../assets/figma/mobile/66899.svg')} />
      <Copy node="258:1510" box={[275, 329, 39, 19]} text={"Impact"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":16.8,"color":"#73787d","textAlign":"center"}} />
      <Copy node="258:1511" box={[20, 384, 147, 24]} text={"Share more thoughts"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#202326","textAlign":"left"}} />
      <Artwork node="258:1512" box={[19.5, 411.5, 354, 128]} source={require('../../../../assets/figma/mobile/4ffb7.svg')} />
      <Copy node="258:1513" box={[35, 427, 194, 19]} text={"What made this event memorable?"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#3f596b99","textAlign":"left"}} />
      <Copy node="258:1514" box={[20, 563, 174, 24]} text={"Would you join us again?"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#202326","textAlign":"left"}} />
      <Artwork node="258:1515" box={[20, 595, 101, 30]} source={require('../../../../assets/figma/mobile/0e0cc.svg')} />
      <Copy node="258:1516" box={[43, 600, 54, 19]} text={"Definitely"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":16.8,"color":"#ffffff","textAlign":"center"}} />
      <Artwork node="258:1517" box={[128, 595, 85, 30]} source={require('../../../../assets/figma/mobile/3a175.svg')} />
      <Copy node="258:1518" box={[151.5, 600, 38, 19]} text={"Maybe"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":16.8,"color":"#73787d","textAlign":"center"}} />
      <Artwork node="258:1519" box={[220, 595, 95, 30]} source={require('../../../../assets/figma/mobile/4a5a2.svg')} />
      <Copy node="258:1520" box={[241.5, 600, 53, 19]} text={"Next time"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":16.8,"color":"#73787d","textAlign":"center"}} />
      <Artwork node="258:1521" box={[20, 768, 353, 50]} source={require('../../../../assets/figma/mobile/37ea2.svg')} />
      <Copy node="258:1522" box={[137, 781, 120, 24]} text={"Submit feedback"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#ffffff","textAlign":"center"}} />
      <Surface node="258:1524" box={[118, 69, 154, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="258:1525" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/ecd92.svg')} />
      <Artwork node="258:1528" box={[324, 69, 43, 43]} source={require('../../../../assets/figma/mobile/acbd8.svg')} />
      <Artwork node="258:1530" box={[334, 79, 24, 24]} source={require('../../../../assets/figma/mobile/57e4f.svg')} />
      <Copy node="258:1531" box={[134, 76, 122, 27]} text={"Event Feedback"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="300:2544" box={[102, 233, 29, 29]} source={require('../../../../assets/figma/mobile/b2c78.svg')} />
      <Artwork node="300:2547" box={[142, 233, 29, 29]} source={require('../../../../assets/figma/mobile/b2c78.svg')} />
      <Artwork node="300:2553" box={[182, 233, 29, 29]} source={require('../../../../assets/figma/mobile/b2c78.svg')} />
      <Artwork node="300:2556" box={[222, 233, 29, 29]} source={require('../../../../assets/figma/mobile/b2c78.svg')} />
      <Artwork node="258:1536" box={[262, 233, 29, 29]} source={require('../../../../assets/figma/mobile/8b99e.svg')} />
      <Link node="258:1525" box={[23, 69, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
