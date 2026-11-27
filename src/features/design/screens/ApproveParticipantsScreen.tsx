import { Participants } from '../EventLists';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 1356:347 · Approve Participants
export function ApproveParticipantsScreen() {
  return (
    <Frame id="1356:347" width={393.0} height={1099} background={"#ffffff"}>
      <Artwork node="1356:396" box={[20, 128, 353, 186]} radius={10} fit="cover" source={require('../../../../assets/figma/mobile/7e54a.jpg')} />
      <Surface node="1356:380" box={[99, 69, 196, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="1356:381" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/ecd92.svg')} />
      <Artwork node="1356:384" box={[324, 69, 43, 43]} source={require('../../../../assets/figma/mobile/acbd8.svg')} />
      <Artwork node="1356:386" box={[334, 79, 24, 24]} source={require('../../../../assets/figma/mobile/57e4f.svg')} />
      <Copy node="1356:387" box={[117, 76, 164, 27]} text={"Approve Participants"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Link node="1356:381" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <Participants moderation/>
    </Frame>
  );
}
