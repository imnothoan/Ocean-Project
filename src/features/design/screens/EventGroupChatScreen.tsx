import { EventConversation } from '../EventLists';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 258:1078 · Event Group Chat
export function EventGroupChatScreen() {
  return (
    <Frame id="258:1078" width={393.0} height={852} background={"#ffffff"}>
      <Copy node="258:1080" box={[178, 133, 37, 17]} text={"TODAY"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":13,"lineHeight":15.6,"color":"#73787d","textAlign":"center"}} />
      <Surface node="258:1097" box={[121, 69, 151, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="258:1098" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/ecd92.svg')} />
      <Artwork node="258:1101" box={[324, 69, 43, 43]} source={require('../../../../assets/figma/mobile/acbd8.svg')} />
      <Artwork node="258:1103" box={[334, 79, 24, 24]} source={require('../../../../assets/figma/mobile/57e4f.svg')} />
      <Copy node="258:1104" box={[149, 70, 92, 27]} text={"Group Chat"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="258:1105" box={[150, 93, 93, 13]} text={"My Khe Beach Cleanup"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":10,"lineHeight":12.0,"color":"#3f596b","textAlign":"left"}} />
      <Link node="258:1098" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <EventConversation/>
    </Frame>
  );
}
