import { ReportHistory } from '../ReportLists';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 230:1379 · 9. My Report History
export function Frame9MyReportHistoryScreen() {
  return (
    <Frame id="230:1379" width={393.0} height={852} background={"#ffffff"}>
      <Copy node="253:458" box={[25, 123, 345, 36]} text={"Your impact, in one place"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":23,"lineHeight":28.75,"color":"#091727","textAlign":"left"}} />
      <Copy node="253:460" box={[27, 159, 345, 35]} text={"Follow your reports and community impact."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":17.5,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="253:462" box={[27, 194, 137, 30]} text={"FILTER BY STATUS"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="253:464" box={[24, 221, 83, 31]} fill={"#43c4d6"} radius={16} />
      <Copy node="253:465" box={[28, 227, 75, 22]} text={"All"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":13,"lineHeight":16.25,"color":"#ffffff","textAlign":"center"}} />
      <Surface node="253:467" box={[118, 221, 114, 31]} fill={"#ffffff"} radius={16} stroke={[1,"#d8e5ec"]} />
      <Copy node="253:468" box={[122, 227, 106, 22]} text={"Pending"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":13,"lineHeight":16.25,"color":"#3f596b","textAlign":"center"}} />
      <Surface node="253:470" box={[244, 221, 128, 31]} fill={"#ffffff"} radius={16} stroke={[1,"#d8e5ec"]} />
      <Copy node="253:471" box={[248, 227, 120, 22]} text={"Verified"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":13,"lineHeight":16.25,"color":"#3f596b","textAlign":"center"}} />
      <Surface node="892:2808" box={[112.71, 67, 165.3, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="892:2809" box={[21, 67, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/7330f.svg')} />
      <Artwork node="892:2812" box={[333, 67, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/9fd81.svg')} />
      <Artwork node="892:2814" box={[342, 77, 26.27, 24]} source={require('../../../../assets/figma/mobile/c9b94.svg')} />
      <Copy node="892:2815" box={[145, 75, 103.99, 27]} text={"My Report"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"center"}} />
      <Link node="892:2809" box={[21, 67, 43, 43]} to="back" label={"Back"} />
      <ReportHistory/>
    </Frame>
  );
}
