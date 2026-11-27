import { CommunitySection, CommunityFeed } from '../CommunityContent';
import { Artwork, Copy, Footer, Frame, Link, Surface } from '../components';

// Figma 101:2769 · 01_UI_Community_Feed
export function Frame01UiCommunityFeedScreen() {
  return (
    <Frame id="101:2769" width={393.0} height={852} background={"#ffffff"}>
      <Artwork node="101:2774" box={[12, 118, 370, 143.6]} source={require('../../../../assets/figma/mobile/efaeb.jpg')} />
      <Artwork node="101:2775" box={[12, 118, 370, 144]} source={require('../../../../assets/figma/mobile/dcf63.svg')} />
      <Artwork node="101:2776" box={[12, 118, 370, 144]} source={require('../../../../assets/figma/mobile/dcf63.svg')} />
      <Artwork node="101:2777" box={[27, 132, 110, 23]} source={require('../../../../assets/figma/mobile/7df8c.svg')} />
      <Copy node="101:2778" box={[31, 135, 102, 16]} text={"LOCAL IMPACT"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":16,"color":"#0186a8","textAlign":"center"}} />
      <Copy node="101:2779" box={[27, 159, 330, 28]} text={"Small actions."} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":22,"lineHeight":28,"color":"#ffffff","textAlign":"left"}} />
      <Copy node="101:2780" box={[27, 187, 330, 28]} text={"Cleaner shores."} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":22,"lineHeight":28,"color":"#ffffff","textAlign":"left"}} />
      <Copy node="101:2781" box={[27, 226, 335, 19]} text={"1,248 neighbors making waves together"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":19,"color":"#ffffff","textAlign":"left"}} />
      <Artwork node="101:2782" box={[12, 274, 94, 33]} source={require('../../../../assets/figma/mobile/955e5.svg')} />
      <Copy node="101:2783" box={[20, 280, 78, 19]} text={"For you"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":19,"color":"#ffffff","textAlign":"center"}} />
      <Artwork node="101:2784" box={[115, 274, 95, 33]} source={require('../../../../assets/figma/mobile/0ea02.svg')} />
      <Copy node="101:2785" box={[123, 280, 79, 19]} text={"Following"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":19,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="755:456" box={[219, 274, 95, 33]} source={require('../../../../assets/figma/mobile/0ea02.svg')} />
      <Copy node="755:457" box={[227, 280, 79, 19]} text={"Group"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":19,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="101:2786" box={[357.49, 282.6, 15.48, 13.29]} source={require('../../../../assets/figma/mobile/2c5cc.svg')} />
      <Artwork node="101:2790" box={[11.5, 314.5, 371, 49]} source={require('../../../../assets/figma/mobile/a3c5d.svg')} />
      <Artwork node="101:2791" box={[21, 323, 32, 31]} source={require('../../../../assets/figma/mobile/e34de.svg')} />
      <Copy node="101:2792" box={[21, 330, 32, 16]} text={"HN"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":16,"color":"#000000","textAlign":"center"}} />
      <Copy node="101:2793" box={[62, 326, 250, 19]} text={"Share a small action..."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":19,"color":"#7b92a1","textAlign":"left"}} />
      <Artwork node="101:2794" box={[329.29, 331.29, 16.36, 14.7]} source={require('../../../../assets/figma/mobile/36661.svg')} />
      <Artwork node="101:2798" box={[356.29, 331.29, 16.36, 14.7]} source={require('../../../../assets/figma/mobile/27d3c.svg')} />
      <Artwork node="701:493" box={[20, 67, 353, 42]} source={require('../../../../assets/figma/mobile/cbdf5.svg')} />
      <Artwork node="701:494" box={[12, 67, 370, 42]} source={require('../../../../assets/figma/mobile/22903.svg')} />
      <Copy node="701:497" box={[60, 82.54, 134, 15]} text={"Search posts, groups or people"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":11,"lineHeight":13.2,"color":"#7b92a1","textAlign":"left"}} />
      <Artwork node="701:496" box={[35.33, 81.32, 14.1, 14.1]} source={require('../../../../assets/figma/mobile/82886.svg')} />
      <Artwork node="701:499" box={[345.41, 80.74, 13.27, 14.61]} source={require('../../../../assets/figma/mobile/cb7a4.svg')} />
      <Link node="755:459" box={[219, 274, 95, 33]} to="115:2686" label={"05_UI_Groups_Organizations"} />
      <Link node="101:2793" box={[62, 326, 250, 19]} to="115:422" label={"03_UI_Create_Post"} />
      <Link node="701:495" box={[12, 67, 370, 42]} to="666:2965" label={"04_UI_Search_Results"} />
      <CommunitySection top={373} padding={12}><CommunityFeed /></CommunitySection>
      <Footer top={751}>
        <Surface node="949:590" box={[0, 751, 393, 101]} fill={"#ffffff"} />
        <Surface node="101:2858" box={[22, 776, 350, 49]} fill={"#a5e0f2"} radius={18} />
        <Surface node="101:2859" box={[94, 776, 66, 49]} fill={"#a5e0f2"} radius={18} />
        <Surface node="918:530" box={[22, 776, 72, 49]} fill={"#a5e0f2"} radius={18} />
        <Surface node="101:2860" box={[291, 776, 81, 49]} fill={"#a5e0f2"} radius={18} />
        <Surface node="101:2861" box={[197, 776, 113, 49]} fill={"#0186a8"} radius={18} />
        <Artwork node="101:2863" box={[159, 751, 75, 75]} source={require('../../../../assets/figma/mobile/db901.svg')} />
        <Artwork node="101:2865" box={[121, 789, 24, 24]} source={require('../../../../assets/figma/mobile/8b932.svg')} />
        <Artwork node="101:2866" box={[50, 789, 24, 24]} source={require('../../../../assets/figma/mobile/9998f.svg')} />
        <Artwork node="101:2867" box={[249, 789, 24, 24]} source={require('../../../../assets/figma/mobile/0ef57.svg')} />
        <Artwork node="101:2868" box={[320, 789, 24, 24]} source={require('../../../../assets/figma/mobile/56c11.svg')} />
        <Artwork node="101:2864" box={[164, 757, 65, 65]} source={require('../../../../assets/figma/mobile/19ec0.svg')} />
        <Artwork node="101:2869" box={[185, 778, 24, 24]} source={require('../../../../assets/figma/mobile/5900e.svg')} />
        <Link node="101:2859" box={[94, 776, 66, 49]} to="258:426" label={"Events Home"} />
        <Link node="918:530" box={[22, 776, 72, 49]} to="403:2759" label={"Q - 20"} />
        <Link node="101:2860" box={[291, 776, 81, 49]} to="666:3592" label={"10_UI_My_Profile_Eco_Impact"} />
        <Link node="1425:257" box={[164, 757, 65, 65]} to="230:1093" label={"1. Report type"} />
        <Link node="101:2864" box={[164, 757, 65, 65]} to="230:1093" label={"1. Report type"} />
      </Footer>
    </Frame>
  );
}
