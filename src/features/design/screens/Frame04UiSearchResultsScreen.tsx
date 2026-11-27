import { CommunitySection, SearchDirectory } from '../CommunityContent';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 666:2965 · 04_UI_Search_Results
export function Frame04UiSearchResultsScreen() {
  return (
    <Frame id="666:2965" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="666:2967" box={[121, 69, 151, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="666:2968" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/b0dc5.svg')} />
      <Copy node="666:2974" box={[140, 77, 113, 27]} text={"Search Results"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="666:2987" box={[19, 127, 353, 42]} source={require('../../../../assets/figma/mobile/cbdf5.svg')} />
      <Artwork node="701:491" box={[19, 127, 353, 42]} source={require('../../../../assets/figma/mobile/cbdf5.svg')} />
      <Artwork node="666:2988" box={[34.32, 141.33, 14.1, 14.1]} source={require('../../../../assets/figma/mobile/9014c.svg')} />
      <Copy node="666:2990" box={[59, 138, 270, 19]} text={"Search posts, groups or people"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":19,"color":"#7b92a1","textAlign":"left"}} />
      <Artwork node="666:2991" box={[344.41, 140.74, 13.27, 14.61]} source={require('../../../../assets/figma/mobile/b06c8.svg')} />
      <CommunitySection top={179} padding={20}><SearchDirectory /></CommunitySection>
    </Frame>
  );
}
