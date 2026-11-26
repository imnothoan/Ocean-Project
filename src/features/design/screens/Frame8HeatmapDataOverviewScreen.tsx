import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 311:1093 · Frame 8 - Heatmap Data Overview
export function Frame8HeatmapDataOverviewScreen() {
  return (
    <Frame id="311:1093" width={393.0} height={852} background={"#ffffff"}>
      <Surface node="323:5650" box={[28, 601, 334, 143]} fill={"#edfbff"} radius={10} />
      <Copy node="323:5640" box={[101, 681.38, 87, 20]} text={"Can Gio Coast"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":15,"lineHeight":18.0,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="323:5643" box={[101, 705.38, 45, 16]} text={"HCM City"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":14.4,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="323:5644" box={[101, 719.38, 26, 16]} text={"87 PL"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":14.4,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="323:5645" box={[169, 719.38, 42, 16]} text={"Primary:"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":14.4,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="323:5646" box={[212, 719.38, 71, 16]} text={"Organic debris"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":14.4,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="323:5647" box={[42, 696.38, 42, 27]} text={"No. 2"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="323:5652" box={[101, 609.38, 75, 20]} text={"Ha Long Bay"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":15,"lineHeight":18.0,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="323:5655" box={[101, 633.38, 45, 16]} text={"HCM City"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":14.4,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="323:5656" box={[101, 647.38, 26, 16]} text={"94 PL"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":14.4,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="323:5657" box={[169, 647.38, 42, 16]} text={"Primary:"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":14.4,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="323:5658" box={[212, 647.38, 35, 16]} text={"Plastics"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":14.4,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="323:5659" box={[42, 624.38, 42, 27]} text={"No. 1"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="323:5661" box={[30, 672, 326, 1]} fill={"#c9d5de"} />
      <Copy node="311:1131" box={[34, 558, 147, 27]} text={"Top Urgent Sectors"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#091727","textAlign":"left"}} />
      <Artwork node="323:5604" box={[23, 183, 350, 345]} source={require('../../../../assets/figma/mobile/ed729.png')} />
      <Artwork node="323:5634" box={[23, 192, 341, 336]} source={require('../../../../assets/figma/mobile/1926b.png')} />
      <Surface node="311:1096" box={[211, 132, 160, 36]} fill={"#ffffff"} radius={20} />
      <Copy node="311:1097" box={[259, 140, 50, 19]} text={"All Levels"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="311:1098" box={[349, 147, 10.54, 6.25]} source={require('../../../../assets/figma/mobile/4abfc.svg')} />
      <Artwork node="311:1130" box={[225, 140, 20.01, 17.01]} source={require('../../../../assets/figma/mobile/8f1e1.svg')} />
      <Surface node="311:1100" box={[22, 132, 160, 36]} fill={"#ffffff"} radius={20} />
      <Copy node="311:1101" box={[64, 140, 61, 19]} text={"This month"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="311:1102" box={[155, 147, 10.54, 6.25]} source={require('../../../../assets/figma/mobile/4abfc.svg')} />
      <Artwork node="311:1129" box={[35, 139, 20, 20]} source={require('../../../../assets/figma/mobile/4899e.svg')} />
      <Surface node="311:1134" box={[102, 69, 190, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="311:1135" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Copy node="311:1138" box={[124, 77, 146, 26]} text={"Pollution Heatmap"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Link node="362:6248" box={[28, 601, 334, 71]} to="311:942" label={"Frame 7 - Area Details Metrics"} />
      <Link node="311:1135" box={[23, 69, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
