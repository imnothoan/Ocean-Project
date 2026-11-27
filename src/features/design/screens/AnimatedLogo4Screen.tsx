import { Artwork, Copy, Frame } from '../components';

// Figma 949:267 · animated logo - 4
export function AnimatedLogo4Screen() {
  return (
    <Frame id="949:267" width={393.0} height={852} background={"#a5e0f2"}>
      <Artwork node="949:272" box={[200.08, 516.2, 2.83, 0.8]} source={require('../../../../assets/figma/mobile/b74b7.svg')} />
      <Artwork node="949:273" box={[32, 390, 80, 80]} radius={100} fit="cover" source={require('../../../../assets/figma/mobile/5cbcd.png')} />
      <Copy node="949:275" box={[131, 414, 231, 60]} text={"Company Name"} typeStyle={{"fontFamily":"Jomhuria_400Regular","fontSize":60,"lineHeight":72.0,"color":"#ffffff","textAlign":"left"}} />
    </Frame>
  );
}
