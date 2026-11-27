import { CommunitySection, GroupDetail } from '../CommunityContent';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 119:3037 · 06_UI_Organization_Detail
export function Frame06UiOrganizationDetailScreen() {
  return (
    <Frame id="119:3037" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="119:3039" box={[121, 69, 151, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="119:3040" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/767dc.svg')} />
      <Copy node="119:3046" box={[144, 77, 105, 27]} text={"Group details"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="119:3050" box={[0, 117, 393, 169]} source={require('../../../../assets/figma/mobile/978c5.jpg')} />
      <Artwork node="119:3051" box={[0, 117, 393, 169]} source={require('../../../../assets/figma/mobile/6050a.svg')} />
      <Artwork node="119:3052" box={[20, 135, 90, 22]} source={require('../../../../assets/figma/mobile/630c9.svg')} />
      <Copy node="119:3053" box={[33.5, 140.06, 63, 16]} text={"COMMUNITY"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":16,"color":"#0186a8","textAlign":"center"}} />
      <Copy node="119:3054" box={[20, 214, 158, 28]} text={"Ocean Guardians"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":23,"lineHeight":28,"color":"#ffffff","textAlign":"left"}} />
      <Copy node="119:3055" box={[20, 251, 353, 19]} text={"Protect marine life & habitats"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":19,"color":"#ffffff","textAlign":"left"}} />
      <Link node="119:3040" box={[23, 69, 43, 43]} to="115:2686" label={"05_UI_Groups_Organizations"} />
      <CommunitySection top={277} padding={20}><GroupDetail /></CommunitySection>
    </Frame>
  );
}
