import { LevelJourney } from '../LevelJourney';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 240:442 · 16_UI_Levels_Rewards
export function Frame16UiLevelsRewardsScreen() {
  return (
    <Frame id="240:442" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="240:444" box={[112, 69, 167, 43]} fill={"#a5e0f2"} radius={20} />
      <Copy node="240:451" box={[131, 77, 130, 27]} text={"Levels & rewards"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="240:445" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/b0dc5.svg')} />
      <Artwork node="240:452" box={[20, 130, 353, 145]} source={require('../../../../assets/figma/mobile/de2f0.svg')} />
      <Artwork node="240:453" box={[42, 168, 64, 64]} source={require('../../../../assets/figma/mobile/ff801.svg')} />
      <Artwork node="240:454" box={[59.99, 185.13, 28.82, 30.47]} source={require('../../../../assets/figma/mobile/d40bb.svg')} />
      <Copy node="240:456" box={[132, 148, 218, 16]} text={"YOUR CURRENT LEVEL"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#a5e0f2","textAlign":"left"}} />
      <Copy node="240:457" box={[132, 164, 218, 28]} text={"Level 4"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":21,"lineHeight":25.2,"color":"#ffffff","textAlign":"left"}} />
      <Copy node="240:458" box={[132, 194, 218, 19]} text={"Eco Guardian"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":16.8,"color":"#ffffff","textAlign":"left"}} />
      <Copy node="240:459" box={[132, 219, 218, 16]} text={"2,460 / 3,000 XP"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":14.4,"color":"#ffffff","textAlign":"left"}} />
      <Artwork node="240:460" box={[132, 240, 218, 7]} source={require('../../../../assets/figma/mobile/18c9a.svg')} />
      <Artwork node="240:461" box={[132, 240, 179, 7]} source={require('../../../../assets/figma/mobile/6a6fb.svg')} />
      <Copy node="240:462" box={[132, 253.2, 218, 16]} text={"540 XP to Planet Protector"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":14.4,"color":"#ffffff","textAlign":"left"}} />
      <Copy node="240:463" box={[20, 289, 118, 23]} text={"Your level journey"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":17,"lineHeight":20.4,"color":"#091727","textAlign":"left"}} />
      <Copy node="240:464" box={[345, 293.5, 28, 16]} text={"4 of 5"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":14.4,"color":"#7b92a1","textAlign":"right"}} />
      <Artwork node="240:465" box={[20,327,353,85]} content={<LevelJourney />} />
      <Artwork node="240:499" box={[19.6, 413.6, 353.8, 0.8]} source={require('../../../../assets/figma/mobile/d1710.svg')} />
      <Copy node="240:500" box={[20, 427, 119, 23]} text={"Available rewards"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":17,"lineHeight":20.4,"color":"#091727","textAlign":"left"}} />
      <Copy node="240:501" box={[336, 431.5, 37, 16]} text={"View all"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#0186a8","textAlign":"right"}} />
      <Artwork node="240:502" box={[19.5, 453.5, 172, 223]} source={require('../../../../assets/figma/mobile/8ec21.svg')} />
      <Copy node="240:503" box={[32, 569.5, 86, 19]} text={"Reusable bottle"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":14,"lineHeight":16.8,"color":"#091727","textAlign":"left"}} />
      <Artwork node="240:504" box={[32, 613, 82, 24]} source={require('../../../../assets/figma/mobile/691a5.svg')} />
      <Copy node="240:505" box={[48, 617, 50, 16]} text={"150 points"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="240:506" box={[32, 644, 147, 25]} source={require('../../../../assets/figma/mobile/4b3c6.svg')} />
      <Copy node="240:507" box={[86, 649, 39, 16]} text={"Redeem"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#ffffff","textAlign":"center"}} />
      <Artwork node="240:516" box={[32, 466, 147, 93]} radius={15} fit="cover" source={require('../../../../assets/figma/mobile/64cf8.png')} />
      <Artwork node="1278:243" box={[298, 100, 95, 100]} source={require('../../../../assets/figma/mobile/2d12f.svg')} />
      <Artwork node="1278:261" box={[307, 130, 66, 66]} source={require('../../../../assets/figma/mobile/99c5d.svg')} />
      <Link node="levelProgressLink" box={[21,137,348,136]} to="670:5193" label={"Your level progress"} />
      <Link node="240:445" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <Link node="759:542" box={[20, 454, 171, 222]} to="670:4692" label={"17_UI_Redeem_Reward"} />
    </Frame>
  );
}
