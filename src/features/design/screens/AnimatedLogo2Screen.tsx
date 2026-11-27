import { Artwork, Frame } from '../components';

// Figma 949:253 · animated logo - 2
export function AnimatedLogo2Screen() {
  return (
    <Frame id="949:253" width={393.0} height={852} background={"#a5e0f2"}>
      <Artwork node="949:258" box={[200.08, 516.2, 2.83, 0.8]} source={require('../../../../assets/figma/mobile/b74b7.svg')} />
      <Artwork node="949:259" box={[147, 253, 110, 110]} radius={100} fit="cover" source={require('../../../../assets/figma/mobile/5cbcd.png')} />
    </Frame>
  );
}
