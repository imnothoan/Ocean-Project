import { ActivityHistory } from '../Learning';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 263:2756 · 15_UI_Points_History
export function Frame15UiPointsHistoryScreen() {
  return (
    <Frame id="263:2756" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="263:2758" box={[112, 69, 167, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="263:2759" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/b0dc5.svg')} />
      <Artwork node="263:2765" box={[20, 142, 353, 130]} source={require('../../../../assets/figma/mobile/7db64.svg')} />
      <Copy node="263:2766" box={[38, 158, 93, 16]} text={"TOTAL ECO POINTS"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#a5e0f2","textAlign":"left"}} />
      <Copy node="263:2767" box={[38, 174, 65, 37]} text={"2,460"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":28,"lineHeight":33.6,"color":"#ffffff","textAlign":"left"}} />
      <Copy node="263:2768" box={[104, 181, 20, 23]} text={"pts"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":17,"lineHeight":20.4,"color":"#ffffff","textAlign":"left"}} />
      <Artwork node="263:2769" box={[245, 158, 108, 26]} source={require('../../../../assets/figma/mobile/4a4c2.svg')} />
      <Copy node="263:2770" box={[261, 163, 77, 16]} text={"+320 this month"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#178b72","textAlign":"center"}} />
      <Copy node="263:2771" box={[20, 285, 84, 23]} text={"Transactions"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":17,"lineHeight":20.4,"color":"#091727","textAlign":"left"}} />
      <Artwork node="263:2772" box={[260, 280, 113, 28]} source={require('../../../../assets/figma/mobile/6faf1.svg')} />
      <Copy node="263:2773" box={[292, 286, 50, 16]} text={"All activity"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":14.4,"color":"#3f596b","textAlign":"center"}} />
      <Copy node="263:2794" box={[144, 78, 105, 27]} text={"Points history"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="1278:239" box={[297, 197, 96, 100]} source={require('../../../../assets/figma/mobile/2d12f.svg')} />
      <Artwork node="1278:257" box={[293, 194, 82, 82]} source={require('../../../../assets/figma/mobile/1886a.svg')} />
      <Artwork node="1425:495" box={[293, 194, 82, 82]} source={require('../../../../assets/figma/mobile/1886a.svg')} />
      <Link node="263:2759" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <ActivityHistory top={305}/>
    </Frame>
  );
}
