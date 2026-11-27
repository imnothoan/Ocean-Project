import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 230:1356 · 10. Rare Species Photo
export function Frame10RareSpeciesPhotoScreen() {
  return (
    <Frame id="230:1356" width={393.0} height={852} background={"#ffffff"}>
      <Copy node="255:574" box={[24, 117, 138, 20]} text={"STEP 1 / 4"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="255:576" box={[229, 117, 140, 20]} text={"RARE SPECIES"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"right"}} />
      <Copy node="230:1358" box={[46.5, 400, 11, 15]} text={"All"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":11,"lineHeight":13.2,"color":"#ffffff","textAlign":"center"}} />
      <Surface node="255:578" box={[24, 143, 345, 5]} fill={"#e6f3f8"} radius={3} />
      <Surface node="255:580" box={[24, 143, 86.25, 5]} fill={"#43c4d6"} radius={3} />
      <Copy node="255:582" box={[24, 163, 205, 36]} text={"Capture the sighting"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":23,"lineHeight":28.75,"color":"#091727","textAlign":"left"}} />
      <Copy node="255:584" box={[24, 199, 345, 35]} text={"Record wildlife without disturbing it."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":17.5,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="255:586" box={[25, 221, 345, 205]} radius={9} fit="cover" source={require('../../../../assets/figma/mobile/55e40.png')} />
      <Surface node="255:593" box={[24, 442, 165, 41]} fill={"#eaf8fb"} radius={22} stroke={[1,"#d8e5ec"]} />
      <Artwork node="255:594" box={[58, 453, 20, 20]} source={require('../../../../assets/figma/mobile/73d3b.svg')} />
      <Copy node="255:597" box={[93, 452, 85, 30]} text={"Camera"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":15,"lineHeight":18.75,"color":"#0186a8","textAlign":"left"}} />
      <Surface node="255:599" box={[201, 442, 168, 41]} fill={"#eaf8fb"} radius={22} stroke={[1,"#d8e5ec"]} />
      <Artwork node="255:600" box={[236, 453, 20, 20]} source={require('../../../../assets/figma/mobile/b0a1b.svg')} />
      <Copy node="255:604" box={[270, 452, 86, 30]} text={"Gallery"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":15,"lineHeight":18.75,"color":"#0186a8","textAlign":"left"}} />
      <Copy node="255:607" box={[24, 494, 198, 30]} text={"PHOTOS ATTACHED (3)"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="255:669" box={[293, 519, 81, 71]} fill={"#ffffff"} radius={10} stroke={[1,"#d8e5ec"]} />
      <Artwork node="255:670" box={[323, 543, 22, 22]} source={require('../../../../assets/figma/mobile/aaa10.svg')} />
      <Artwork node="255:673" box={[113, 518, 78, 71]} radius={11} fit="cover" source={require('../../../../assets/figma/mobile/6090e.png')} />
      <Artwork node="255:676" box={[23, 519, 78, 71]} radius={11} fit="cover" source={require('../../../../assets/figma/mobile/55e40.png')} />
      <Artwork node="255:674" box={[203, 518, 78, 71]} radius={11} fit="cover" source={require('../../../../assets/figma/mobile/e0e78.png')} />
      <Surface node="255:678" box={[24, 610, 345, 72]} fill={"#e8f8f3"} radius={13} />
      <Surface node="255:679" box={[36, 622, 43, 43]} fill={"#d2f4e7"} radius={22} />
      <Artwork node="255:680" box={[47, 633, 21, 21]} source={require('../../../../assets/figma/mobile/c4ee8.svg')} />
      <Copy node="255:683" box={[89, 624, 258, 30]} text={"Respect marine wildlife"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":15,"lineHeight":18.75,"color":"#091727","textAlign":"left"}} />
      <Copy node="255:684" box={[89, 646, 263, 23]} text={"Keep a safe distance. Never touch animals."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":15,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="255:686" box={[24, 727, 345, 46]} fill={"#43c4d6"} radius={23} />
      <Copy node="255:687" box={[29, 738, 335, 27]} text={"Continue to species"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":20,"color":"#ffffff","textAlign":"center"}} />
      <Surface node="892:3006" box={[101, 67, 187, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="892:3007" box={[23, 66, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/7330f.svg')} />
      <Artwork node="892:3010" box={[331, 66, 43.3, 43.3]} source={require('../../../../assets/figma/mobile/9fd81.svg')} />
      <Artwork node="892:3012" box={[340, 77, 26.27, 24]} source={require('../../../../assets/figma/mobile/c9b94.svg')} />
      <Copy node="892:3013" box={[113, 75, 165, 27]} text={"Report Rare Species"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"center"}} />
      <Link node="255:686" box={[24, 727, 345, 46]} to="230:2029" label={"11. Rare Species Type"} />
      <Link node="892:3007" box={[23, 66, 43, 43]} to="back" label={"Back"} />
      <Copy node="reportRemovePhoto" box={[280,497,80,24]} text={"Remove"} typeStyle={{fontFamily:"AfacadFlux_600SemiBold",fontSize:14,color:"#0186a8",textAlign:"right"}}/>
    </Frame>
  );
}
