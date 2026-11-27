import { BadgeCollection } from '../BadgeCollection';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 218:2549 · 12_UI_Achievements_Badges
export function Frame12UiAchievementsBadgesScreen() {
  return (
    <Frame id="218:2549" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="218:2551" box={[121, 69, 151, 43]} fill={"#a5e0f2"} radius={20} />
      <Copy node="218:2558" box={[142, 77, 109, 27]} text={"Achievements"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="218:2552" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/b0dc5.svg')} />
      <Artwork node="218:2559" box={[15, 117, 353, 124]} source={require('../../../../assets/figma/mobile/f678f.svg')} />
      <Artwork node="1278:234" box={[267, 98, 100, 100]} source={require('../../../../assets/figma/mobile/2d12f.svg')} />
      <Copy node="218:2562" box={[33, 135, 99, 16]} text={"YOUR ECO JOURNEY"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#a5e0f2","textAlign":"left"}} />
      <Copy node="218:2563" box={[33, 159, 225, 28]} text={"12 of 24 badges"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":21,"lineHeight":25.2,"color":"#ffffff","textAlign":"left"}} />
      <Copy node="218:2564" box={[33, 191.5, 255, 17]} text={"You’re halfway to the next milestone."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":14.4,"color":"#ffffff","textAlign":"left"}} />
      <Artwork node="218:2565" box={[33, 214, 270, 7]} source={require('../../../../assets/figma/mobile/9c9f0.svg')} />
      <Artwork node="218:2566" box={[33, 214, 135, 7]} source={require('../../../../assets/figma/mobile/659e6.svg')} />
      <Artwork node="218:2567" box={[15, 255, 49, 28]} source={require('../../../../assets/figma/mobile/cc560.svg')} />
      <Copy node="218:2568" box={[34, 261, 12, 16]} text={"All"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#ffffff","textAlign":"center"}} />
      <Artwork node="218:2569" box={[71, 255, 98, 28]} source={require('../../../../assets/figma/mobile/d9b78.svg')} />
      <Copy node="218:2570" box={[92, 261, 56, 16]} text={"Community"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#0186a8","textAlign":"center"}} />
      <Artwork node="218:2571" box={[176, 255, 77, 28]} source={require('../../../../assets/figma/mobile/0bc99.svg')} />
      <Copy node="218:2572" box={[195, 261, 40, 16]} text={"Cleanup"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="218:2573" box={[260, 255, 90, 28]} source={require('../../../../assets/figma/mobile/d132e.svg')} />
      <Copy node="218:2574" box={[278, 261, 54, 16]} text={"Knowledge"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#3f596b","textAlign":"center"}} />
      <Copy node="218:2575" box={[15, 295, 83, 23]} text={"Your badges"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":17,"lineHeight":20.4,"color":"#091727","textAlign":"left"}} />
      <Copy node="218:2576" box={[318, 299.5, 50, 16]} text={"12 earned"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":14.4,"color":"#7b92a1","textAlign":"right"}} />
      <BadgeCollection />
      <Artwork node="1278:253" box={[280, 122, 82, 82]} source={require('../../../../assets/figma/mobile/1886a.svg')} />
      <Link node="218:2552" box={[23, 69, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
