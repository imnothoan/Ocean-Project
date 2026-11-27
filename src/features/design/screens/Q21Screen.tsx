import { MapList } from '../MapList';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 403:2866 · Q - 21
export function Q21Screen() {
  return (
    <Frame id="403:2866" width={393.0} height={852} background={"#ffffff"}>
      <Copy node="403:2982" box={[22, 114, 123, 24]} text={"Nearby Reports"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#0f172a","textAlign":"left"}} />
      <Surface node="403:2984" box={[253, 114, 116, 28]} fill={"#ffffff"} radius={18} stroke={[1,"rgba(0,0,0,0.2)"]} />
      <Copy node="403:2985" box={[288, 116, 66, 23]} text={"Map View"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":22.8,"color":"#2b2b2b","textAlign":"right"}} />
      <Artwork node="403:2986" box={[271, 120, 18, 16]} source={require('../../../../assets/figma/mobile/cc36a.svg')} />
      <Copy node="403:2989" box={[22, 59, 146, 43]} text={"BlueCitizen"} runs={[[0,4,"#0186a8"],[4,11,"#144957"]]} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":32,"lineHeight":38.4,"color":"#0186a8","textAlign":"left","letterSpacing":0.5}} />
      <Surface node="403:2990" box={[340, 64.5, 32, 32]} fill={"#ffffff"} radius={16} stroke={[2,"#2b2b2b"]} />
      <Artwork node="403:2991" box={[346, 70.5, 20, 20]} source={require('../../../../assets/figma/mobile/ddf08.svg')} />
      <Link node="403:2983" box={[253, 114, 116, 28]} to="403:2759" label={"Q - 20"} />
      <MapList/>
    </Frame>
  );
}
