import { Artwork, Frame } from '../components';

// Figma 949:246 · animated logo - 1
export function AnimatedLogo1Screen() {
  return (
    <Frame id="949:246" width={393.0} height={852} background={"#a5e0f2"}>
      <Artwork node="949:251" box={[60, 437, 283, 80]} source={require('../../../../assets/figma/mobile/5b616.svg')} />
      <Artwork node="949:252" box={[169, 545, 64, 64]} source={require('../../../../assets/figma/mobile/5cbcd.png')} radius={100} />
    </Frame>
  );
}
