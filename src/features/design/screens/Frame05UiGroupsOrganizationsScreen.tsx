import { CommunitySection, GroupDirectory } from '../CommunityContent';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 115:2686 · 05_UI_Groups_Organizations
export function Frame05UiGroupsOrganizationsScreen() {
  return (
    <Frame id="115:2686" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="115:2688" box={[127, 69, 137, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="115:2689" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/60e00.svg')} />
      <Copy node="115:2695" box={[163, 77, 57, 27]} text={"Groups "} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="115:2696" box={[20, 122, 353, 43]} source={require('../../../../assets/figma/mobile/478a0.svg')} />
      <Artwork node="115:2697" box={[34.58, 135.58, 15.67, 15.67]} source={require('../../../../assets/figma/mobile/7e0fa.svg')} />
      <Copy node="115:2700" box={[61, 134, 270, 19]} text={"Search groups or causes"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":19,"color":"#7b92a1","textAlign":"left"}} />
      <Artwork node="115:2701" box={[346.58, 136, 14.83, 12.75]} source={require('../../../../assets/figma/mobile/5951c.svg')} />
      <Artwork node="115:2705" box={[20, 176, 52, 28]} source={require('../../../../assets/figma/mobile/e97de.svg')} />
      <Copy node="115:2706" box={[20, 182, 52, 16]} text={"All"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":16,"color":"#ffffff","textAlign":"center"}} />
      <Artwork node="115:2707" box={[79, 176, 83, 28]} source={require('../../../../assets/figma/mobile/e4938.svg')} />
      <Copy node="115:2708" box={[79, 182, 83, 16]} text={"Cleanup"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":16,"color":"#0186a8","textAlign":"center"}} />
      <Artwork node="115:2709" box={[169, 176, 82, 28]} source={require('../../../../assets/figma/mobile/fa7be.svg')} />
      <Copy node="115:2710" box={[169, 182, 82, 16]} text={"Wildlife"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="115:2711" box={[258, 176, 94, 28]} source={require('../../../../assets/figma/mobile/29477.svg')} />
      <Copy node="115:2712" box={[258, 182, 94, 16]} text={"Education"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="115:2716" box={[20, 218, 353, 111]} source={require('../../../../assets/figma/mobile/978c5.jpg')} />
      <Artwork node="115:2717" box={[20, 218, 353, 111]} source={require('../../../../assets/figma/mobile/26c24.svg')} />
      <Copy node="115:2718" box={[36, 226, 320, 16]} text={"BETTER TOGETHER"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":16,"color":"#ffffff","textAlign":"left"}} />
      <Copy node="115:2719" box={[36, 246, 320, 25]} text={"Find your people."} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":25,"color":"#ffffff","textAlign":"left"}} />
      <Copy node="115:2720" box={[36, 271, 320, 25]} text={"Make a real impact."} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":25,"color":"#ffffff","textAlign":"left"}} />
      <Copy node="115:2721" box={[36, 301, 320, 16]} text={"Local communities for a healthier coast"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":16,"color":"#ffffff","textAlign":"left"}} />
      <Link node="115:2689" box={[23, 69, 43, 43]} to="101:2769" label={"01_UI_Community_Feed"} />
      <CommunitySection top={337} padding={20}><GroupDirectory /></CommunitySection>
    </Frame>
  );
}
