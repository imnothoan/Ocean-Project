import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 1581:1986 · D8 - Donation Certificate
export function D8DonationCertificateScreen() {
  return (
    <Frame id="1581:1986" width={393.0} height={852} background={"#ffffff"}>
      <Copy node="1581:1987" box={[24, 126, 345, 23]} text={"Your contribution is making a difference."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":15,"lineHeight":20,"color":"#3f596b","textAlign":"left"}} />
      <Surface node="1581:1988" box={[24, 168, 345, 420]} fill={"#edfbff"} radius={16} stroke={[1,"#c9d5de"]} />
      <Surface node="1581:1989" box={[24, 168, 345, 8]} fill={"#43c4d6"} radius={4} />
      <Copy node="1581:1990" box={[48, 205, 297, 20]} text={"CERTIFICATE OF IMPACT"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":12,"lineHeight":16,"color":"#0186a8","textAlign":"center"}} />
      <Copy node="1581:1991" box={[48, 233, 297, 30]} text={"Thank you for giving back"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":22,"lineHeight":28,"color":"#091727","textAlign":"center"}} />
      <Copy node="1581:1992" box={[48, 284, 297, 20]} text={"Gifted by"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"center"}} />
      <Copy node="1581:1993" box={[48, 303, 297, 27]} text={"Community member"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":19,"lineHeight":24,"color":"#091727","textAlign":"center"}} />
      <Surface node="1581:1994" box={[56, 344, 281, 1]} fill={"#c9d5de"} />
      <Copy node="1581:1995" box={[48, 369, 128, 20]} text={"Campaign"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1996" box={[48, 388, 273, 23]} text={"Protect Phu Quoc Coral Reef"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":15,"lineHeight":20,"color":"#091727","textAlign":"left"}} />
      <Copy node="1581:1997" box={[48, 431, 128, 20]} text={"Amount"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:1998" box={[48, 450, 128, 25]} text={"$20"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":17,"lineHeight":22,"color":"#0186a8","textAlign":"left"}} />
      <Copy node="1581:1999" box={[208, 431, 128, 20]} text={"Date"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:2000" box={[208, 450, 128, 23]} text={"04 Nov 2026"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":15,"lineHeight":20,"color":"#091727","textAlign":"left"}} />
      <Copy node="1581:2001" box={[48, 501, 128, 20]} text={"Certificate ID"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="1581:2002" box={[48, 520, 273, 22]} text={"BC-2026-1104-0042"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":14,"lineHeight":18,"color":"#0186a8","textAlign":"left"}} />
      <Copy node="1581:2003" box={[48, 558, 297, 19]} text={"Verified donation impact"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":11,"lineHeight":15,"color":"#3f596b","textAlign":"center"}} />
      <Surface node="1581:2004" box={[24, 616, 345, 52]} fill={"#43c4d6"} radius={26} />
      <Copy node="1581:2005" box={[24, 632, 345, 24]} text={"Download PNG/PDF"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":20,"color":"#ffffff","textAlign":"center"}} />
      <Surface node="1581:2006" box={[24, 684, 345, 52]} fill={"#ffffff"} radius={26} stroke={[1,"#0186a8"]} />
      <Copy node="1581:2007" box={[24, 700, 345, 24]} text={"Share"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":16,"lineHeight":20,"color":"#0186a8","textAlign":"center"}} />
      <Copy node="1581:2008" box={[24, 782, 345, 20]} text={"Share your impact with friends and community."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":12,"lineHeight":16,"color":"#3f596b","textAlign":"center"}} />
      <Surface node="1581:2010" box={[104, 69, 185, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="1581:2011" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Copy node="1581:2014" box={[118, 78, 158, 26]} text={"Donation certificate"} typeStyle={{"fontFamily":"AfacadFlux_600SemiBold","fontSize":20,"lineHeight":25.4,"color":"#3f596b","textAlign":"left"}} />
      <Link node="1581:2011" box={[23, 69, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
