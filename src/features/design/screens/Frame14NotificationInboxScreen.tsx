import { ReportInbox } from '../ReportLists';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 230:2075 · 14. Notification Inbox
export function Frame14NotificationInboxScreen() {
  return (
    <Frame id="230:2075" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="891:471" box={[112.71, 67, 165.3, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="891:472" box={[23, 66, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/7330f.svg')} />
      <Artwork node="891:475" box={[331, 66, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/9fd81.svg')} />
      <Artwork node="891:477" box={[340, 77, 26.27, 24]} source={require('../../../../assets/figma/mobile/c9b94.svg')} />
      <Copy node="891:478" box={[145, 75, 103.99, 27]} text={"Notification"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"center"}} />
      <Copy node="255:961" box={[24, 145, 181, 36]} text={"Stay up to date"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":23,"lineHeight":28.75,"color":"#091727","textAlign":"left"}} />
      <Copy node="255:962" box={[24, 181, 345, 35]} text={"Your reports and nearby environmental alerts."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":17.5,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="255:963" box={[24, 218, 83, 31]} fill={"#43c4d6"} radius={16} />
      <Copy node="255:964" box={[28, 224, 75, 22]} text={"All"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":13,"lineHeight":16.25,"color":"#ffffff","textAlign":"center"}} />
      <Surface node="255:965" box={[118, 218, 112, 31]} fill={"#ffffff"} radius={16} stroke={[1,"#d8e5ec"]} />
      <Copy node="255:966" box={[122, 224, 104, 22]} text={"Unread"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":13,"lineHeight":16.25,"color":"#3f596b","textAlign":"center"}} />
      <Surface node="255:967" box={[239, 218, 130, 31]} fill={"#ffffff"} radius={16} stroke={[1,"#d8e5ec"]} />
      <Copy node="255:968" box={[243, 224, 122, 22]} text={"Alerts"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":13,"lineHeight":16.25,"color":"#3f596b","textAlign":"center"}} />
      <Link node="891:472" box={[23, 66, 43, 43]} to="back" label={"Back"} />
      <ReportInbox/>
    </Frame>
  );
}
