import { Artwork, Frame } from '../components';

// Figma 949:260 · animated logo - 3
export function AnimatedLogo3Screen() {
  return (
    <Frame id="949:260" width={393.0} height={852} background={"#a5e0f2"}>
      <Artwork node="949:265" box={[200.08, 516.2, 2.83, 0.8]} source={require('../../../../assets/figma/mobile/b74b7.svg')} />
      <Artwork node="949:266" box={[161, 386, 80, 80]} source={require('../../../../assets/figma/mobile/5cbcd.png')} radius={100} />
    </Frame>
  );
}
