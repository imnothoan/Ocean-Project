import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 258:1078 · Event Group Chat
export function EventGroupChatScreen() {
  return (
    <Frame id="258:1078" width={393.0} height={852} background={"#ffffff"}>
      <Artwork node="258:1078" box={[0, 0, 393, 852]} source={require('../../../../assets/figma/mobile/58c51.svg')} />
      <Copy node="258:1080" box={[178, 133, 37, 17]} text={"TODAY"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":13,"lineHeight":15.6,"color":"#73787d","textAlign":"center"}} />
      <Artwork node="258:1081" box={[67.5, 166.5, 236, 55]} source={require('../../../../assets/figma/mobile/0cf11.svg')} />
      <Copy node="258:1082" box={[80, 173, 51, 21]} text={"Community member"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Copy node="258:1083" box={[80, 193, 178, 19]} text={"Remember to bring your gloves!"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#202326","textAlign":"left"}} />
      <Artwork node="258:1084" box={[122, 236, 235, 52]} source={require('../../../../assets/figma/mobile/f51aa.svg')} />
      <Copy node="258:1085" box={[136, 242, 96, 21]} text={"Community member"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#ffffff","textAlign":"left"}} />
      <Copy node="258:1086" box={[136, 262, 135, 19]} text={"All packed and ready 👍"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#ffffff","textAlign":"left"}} />
      <Artwork node="258:1087" box={[67.5, 302.5, 248, 55]} source={require('../../../../assets/figma/mobile/25a03.svg')} />
      <Copy node="258:1088" box={[80, 309, 101, 21]} text={"Community member"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Copy node="258:1089" box={[80, 329, 147, 19]} text={"Meet at the east entrance."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#202326","textAlign":"left"}} />
      <Artwork node="258:1090" box={[122, 375, 235, 53]} source={require('../../../../assets/figma/mobile/93559.svg')} />
      <Copy node="258:1091" box={[136, 382, 96, 21]} text={"Community member"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#ffffff","textAlign":"left"}} />
      <Copy node="258:1092" box={[136, 402, 159, 19]} text={"See you all Sunday morning!"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#ffffff","textAlign":"left"}} />
      <Artwork node="258:1093" box={[19.5, 756.5, 354, 49]} source={require('../../../../assets/figma/mobile/029af.svg')} />
      <Copy node="258:1094" box={[36, 773, 97, 19]} text={"Type a message..."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:1095" box={[328, 765, 32, 32]} source={require('../../../../assets/figma/mobile/5e4b6.svg')} />
      <Surface node="258:1097" box={[121, 69, 151, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="258:1098" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/ecd92.svg')} />
      <Artwork node="258:1101" box={[324, 69, 43, 43]} source={require('../../../../assets/figma/mobile/acbd8.svg')} />
      <Artwork node="258:1103" box={[334, 79, 24, 24]} source={require('../../../../assets/figma/mobile/57e4f.svg')} />
      <Copy node="258:1104" box={[149, 70, 92, 27]} text={"Group Chat"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="258:1105" box={[150, 93, 93, 13]} text={"My Khe Beach Cleanup"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":10,"lineHeight":12.0,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="258:1107" box={[29, 177, 34, 34]} />
      <Artwork node="258:1111" box={[29, 313, 34, 34]} />
      <Artwork node="258:1114" box={[335, 773, 18, 18]} source={require('../../../../assets/figma/mobile/b9588.svg')} />
      <Link node="258:1098" box={[23, 69, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
