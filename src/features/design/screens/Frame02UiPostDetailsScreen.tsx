import { CommunitySection, PostDetail } from '../CommunityContent';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 105:2895 · 02_UI_Post_Details
export function Frame02UiPostDetailsScreen() {
  return (
    <Frame id="105:2895" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="105:2897" box={[121, 69, 151, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="105:2898" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/60e00.svg')} />
      <Copy node="105:2997" box={[152, 77, 90, 27]} text={"Post details"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Link node="105:2898" box={[23, 69, 43, 43]} to="101:2769" label={"01_UI_Community_Feed"} />
      <CommunitySection top={116} padding={20}><PostDetail /></CommunitySection>
    </Frame>
  );
}
