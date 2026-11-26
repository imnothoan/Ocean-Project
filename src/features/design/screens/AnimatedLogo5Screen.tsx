import { Artwork, Copy, Frame } from '../components';

// Figma 949:276 · animated logo - 5
export function AnimatedLogo5Screen() {
  return (
    <Frame id="949:276" width={393.0} height={852} background={"#a5e0f2"}>
      <Artwork node="949:281" box={[200.08, 516.2, 2.83, 0.8]} source={require('../../../../assets/figma/mobile/b74b7.svg')} />
      <Artwork node="949:282" box={[54, 390, 80, 80]} source={require('../../../../assets/figma/mobile/5cbcd.png')} radius={100} />
      <Copy node="949:284" box={[153, 402, 181, 53]} text={"BlueCitizen"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":40,"lineHeight":48.0,"color":"#43c4d6","textAlign":"left","letterSpacing":0.5}} />
    </Frame>
  );
}
