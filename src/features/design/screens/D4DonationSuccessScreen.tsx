import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 1581:1764 · D4 - Donation Success
export function D4DonationSuccessScreen() {
  return (
    <Frame id="1581:1764" width={393.0} height={852} background={"#ffffff"}>
      <Copy node="1581:1766" box={[136.5, 160, 120, 86]} text={"✓"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":72,"lineHeight":86,"color":"#ffffff","textAlign":"center"}} />
      <Copy node="1581:1767" box={[24, 294, 345, 30]} text={"Thank you for making a difference!"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":24,"lineHeight":30,"color":"#091727","textAlign":"center"}} />
      <Copy node="1581:1768" box={[24, 335, 345, 23]} text={"Your donation has been received."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":15,"lineHeight":20,"color":"#3f596b","textAlign":"center"}} />
      <Surface node="1581:1769" box={[24, 390, 345, 116]} fill={"#edfbff"} radius={12} stroke={[1,"#c9d5de"]} />
      <Copy node="1581:1770" box={[40, 408, 313, 22]} text={"Your impact"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":14,"lineHeight":18,"color":"#3f596b","textAlign":"center"}} />
      <Copy node="1581:1771" box={[40, 438, 313, 28]} text={"You have helped clear 5kg of trash."} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":28,"color":"#0186a8","textAlign":"center"}} />
      <Copy node="1581:1772" box={[40, 476, 313, 20]} text={"Together, we help protect our oceans."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"center"}} />
      <Surface node="1581:1773" box={[24, 544, 345, 48]} fill={"#43c4d6"} radius={28} />
      <Copy node="1581:1774" box={[24, 551, 345, 29]} text={"View certificate"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":18,"lineHeight":29,"color":"#ffffff","textAlign":"center"}} />
      <Surface node="1581:1775" box={[24, 608, 345, 48]} fill={"#ffffff"} radius={28} stroke={[1,"#43c4d6"]} />
      <Copy node="1581:1776" box={[24, 615, 345, 29]} text={"Share"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":18,"lineHeight":29,"color":"#43c4d6","textAlign":"center"}} />
      <Surface node="1581:1777" box={[24, 672, 345, 48]} fill={"#ffffff"} radius={28} stroke={[1,"#c9d5de"]} />
      <Copy node="1581:1778" box={[24, 679, 345, 29]} text={"Back to Events"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":18,"lineHeight":29,"color":"#3f596b","textAlign":"center"}} />
      <Copy node="1581:1779" box={[24, 757, 345, 20]} text={"A receipt has been sent to your account."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"center"}} />
      <Surface node="1581:1781" box={[105, 68, 183, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="1581:1782" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Copy node="1581:1785" box={[121, 77, 152, 26]} text={"Donation complete"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Artwork node="1704:2756" box={[140, 145, 114, 114]} source={require('../../../../assets/figma/mobile/456fb.svg')} />
      <Link node="1581:1773" box={[24, 544, 345, 48]} to="1581:1986" label={"D8 - Donation Certificate"} />
      <Link node="1581:1777" box={[24, 672, 345, 48]} to="258:426" label={"Events Home"} />
      <Link node="1581:1782" box={[23, 69, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
