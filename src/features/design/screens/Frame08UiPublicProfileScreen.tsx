import { CommunitySection, PublicProfile } from '../CommunityContent';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 666:4125 · 08_UI_Public_Profile
export function Frame08UiPublicProfileScreen() {
  return (
    <Frame id="666:4125" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="666:4127" box={[121, 69, 151, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="666:4128" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/70f9a.svg')} />
      <Copy node="666:4134" box={[171, 79, 51, 27]} text={"Profile"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"center"}} />
      <Link node="666:4128" box={[23, 69, 43, 43]} to="666:3366" label={"07_UI_Organization_Members"} />
      <CommunitySection top={137} padding={20}><PublicProfile /></CommunitySection>
    </Frame>
  );
}
