import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 230:1213 · 2. Pollution Add Photo
export function Frame2PollutionAddPhotoScreen() {
  return (
    <Frame id="230:1213" width={393.0} height={852} background={"#ffffff"}>
      <Copy node="230:1215" box={[46.5, 400, 11, 15]} text={"All"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":11,"lineHeight":13.2,"color":"#ffffff","textAlign":"center"}} />
      <Copy node="230:4579" box={[27, 124, 71, 20]} text={"STEP 1 / 6"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="230:4596" box={[302, 124, 70, 20]} text={"POLLUTION"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"right"}} />
      <Surface node="230:4610" box={[26, 150, 345, 5]} fill={"#e6f3f8"} radius={3} />
      <Surface node="230:4612" box={[26, 150, 57.5, 5]} fill={"#43c4d6"} radius={3} />
      <Copy node="230:4614" box={[23, 165, 345, 35]} text={"Add photo evidence"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":23,"lineHeight":29,"color":"#091727","textAlign":"left"}} />
      <Copy node="230:4616" box={[22, 196, 264, 24]} text={"Clear photos help reviewers assess the issue."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":18,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="230:4618" box={[27, 225, 345, 201]} source={require('../../../../assets/figma/mobile/9d210.png')} radius={12} />
      <Surface node="242:4619" box={[24, 443, 165, 42]} fill={"#eaf8fb"} radius={23} stroke={[1,"#d8e5ec"]} />
      <Artwork node="242:4620" box={[58, 453, 22, 22]} source={require('../../../../assets/figma/mobile/507ae.svg')} />
      <Copy node="242:4623" box={[93, 454, 79, 20]} text={"Camera"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":15,"lineHeight":19,"color":"#0186a8","textAlign":"left"}} />
      <Surface node="242:4625" box={[201, 443, 168, 42]} fill={"#eaf8fb"} radius={23} stroke={[1,"#d8e5ec"]} />
      <Artwork node="242:4626" box={[238, 453, 22, 22]} source={require('../../../../assets/figma/mobile/81b42.svg')} />
      <Copy node="242:4630" box={[273, 454, 79, 20]} text={"Gallery"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":15,"lineHeight":19,"color":"#0186a8","textAlign":"left"}} />
      <Copy node="242:4633" box={[24, 499, 121, 16]} text={"PHOTOS ATTACHED (3)"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="242:4635" box={[292, 523, 81, 72]} fill={"#ffffff"} radius={10} stroke={[1,"#d8e5ec"]} />
      <Artwork node="242:4636" box={[321, 547, 25, 25]} source={require('../../../../assets/figma/mobile/1412c.svg')} />
      <Artwork node="242:4655" box={[22, 523, 78, 72]} source={require('../../../../assets/figma/mobile/d45a0.png')} radius={9} />
      <Artwork node="242:4656" box={[205, 523, 78, 72]} source={require('../../../../assets/figma/mobile/3651f.png')} radius={9} />
      <Artwork node="242:4658" box={[115, 523, 78, 72]} source={require('../../../../assets/figma/mobile/e95d4.png')} radius={9} />
      <Surface node="242:4660" box={[24, 613, 345, 68]} fill={"#fff2ec"} radius={14} />
      <Surface node="242:4661" box={[36, 624, 42, 42]} fill={"#ffe3d6"} radius={21} />
      <Artwork node="242:4662" box={[47, 634, 20, 20]} source={require('../../../../assets/figma/mobile/8d3ba.svg')} />
      <Copy node="242:4665" box={[89, 623, 265, 29]} text={"Safety first"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":15,"lineHeight":19,"color":"#091727","textAlign":"left"}} />
      <Copy node="242:4666" box={[89, 644, 263, 35]} text={"Avoid hazardous waste and restricted areas."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="242:4668" box={[22, 736, 345, 47]} fill={"#43c4d6"} radius={23} />
      <Copy node="242:4669" box={[34, 748, 321, 28]} text={"Continue to location"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":20,"color":"#ffffff","textAlign":"center"}} />
      <Surface node="892:3032" box={[113, 67, 175, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="892:3033" box={[23, 66, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/7330f.svg')} />
      <Artwork node="892:3036" box={[332, 66, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/9fd81.svg')} />
      <Artwork node="892:3038" box={[340, 75, 26.27, 24]} source={require('../../../../assets/figma/mobile/c9b94.svg')} />
      <Copy node="892:3039" box={[129, 75, 139, 27]} text={"Report Pollution"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"center"}} />
      <Link node="242:4668" box={[22, 736, 345, 47]} to="230:1237" label={"3. Pollution Select Location"} />
      <Link node="892:3033" box={[23, 66, 43, 43]} to="back" label={"Back"} />
      <Copy node="reportRemovePhoto" box={[280,497,80,24]} text={"Remove"} typeStyle={{fontFamily:"AfacadFlux_600SemiBold",fontSize:14,color:"#0186a8",textAlign:"right"}}/>
    </Frame>
  );
}
