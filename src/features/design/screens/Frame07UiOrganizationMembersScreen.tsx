import { CommunitySection, GroupMembers } from '../CommunityContent';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 666:3366 · 07_UI_Organization_Members
export function Frame07UiOrganizationMembersScreen() {
  return (
    <Frame id="666:3366" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="666:3368" box={[121, 69, 151, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="666:3369" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/c40f7.svg')} />
      <Copy node="666:3375" box={[160, 77, 73, 27]} text={"Members"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="666:3376" box={[20, 134, 353, 68]} source={require('../../../../assets/figma/mobile/2d99b.svg')} />
      <Artwork node="666:3377" box={[34, 146, 44, 44]} source={require('../../../../assets/figma/mobile/c7baf.svg')} />
      <Artwork node="666:3378" box={[45.92, 157.92, 19.32, 19.32]} source={require('../../../../assets/figma/mobile/e8ade.svg')} />
      <Copy node="666:3380" box={[85, 146, 205, 22]} text={"Ocean Guardians"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":17,"lineHeight":22,"color":"#091727","textAlign":"left"}} />
      <Copy node="666:3381" box={[85, 172, 205, 16]} text={"860 members · Public group"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":16,"color":"#7b92a1","textAlign":"left"}} />
      <Artwork node="666:3382" box={[293, 154, 68, 28]} source={require('../../../../assets/figma/mobile/f6899.svg')} />
      <Copy node="666:3383" box={[293, 159, 68, 19]} text={"Invite"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":19,"color":"#ffffff","textAlign":"center"}} />
      <Artwork node="666:3384" box={[20, 216, 353, 40]} source={require('../../../../assets/figma/mobile/31326.svg')} />
      <Artwork node="666:3385" box={[35.32, 229.33, 14.1, 14.1]} source={require('../../../../assets/figma/mobile/9014c.svg')} />
      <Copy node="666:3387" box={[60, 226, 290, 19]} text={"Search members"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":19,"color":"#7b92a1","textAlign":"left"}} />
      <Link node="666:3369" box={[23, 69, 43, 43]} to="119:3037" label={"06_UI_Organization_Detail"} />
      <CommunitySection top={258} padding={20}><GroupMembers /></CommunitySection>
    </Frame>
  );
}
