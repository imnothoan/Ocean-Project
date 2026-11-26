import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 708:684 · Create Event - Step 3
export function CreateEventStep3Screen() {
  return (
    <Frame id="708:684" width={393.0} height={852} background={"#ffffff"}>
      <Artwork node="708:684" box={[0, 0, 393, 852]} source={require('../../../../assets/figma/mobile/58c51.svg')} />
      <Copy node="708:686" box={[22, 162, 302, 35]} text={"Create a Donation Campaign"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":26,"lineHeight":31.2,"color":"#25282b","textAlign":"left"}} />
      <Artwork node="708:688" box={[16.5, 200.5, 360, 503]} source={require('../../../../assets/figma/mobile/52a43.svg')} />
      <Copy node="708:689" box={[31, 215, 66, 21]} text={"Bank code"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="708:690" box={[30.5, 239.5, 332, 43]} source={require('../../../../assets/figma/mobile/d56f3.svg')} />
      <Copy node="708:691" box={[43, 252, 64, 19]} text={"eg. 970422"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#9aa0a5","textAlign":"left"}} />
      <Copy node="708:692" box={[31, 290, 102, 21]} text={"Account number"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="708:693" box={[30.5, 314.5, 332, 43]} source={require('../../../../assets/figma/mobile/d56f3.svg')} />
      <Copy node="708:694" box={[43, 327, 93, 19]} text={"Account number"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#9aa0a5","textAlign":"left"}} />
      <Copy node="708:695" box={[31, 365, 133, 21]} text={"Account holder name"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="708:696" box={[30.5, 389.5, 332, 43]} source={require('../../../../assets/figma/mobile/d56f3.svg')} />
      <Copy node="708:697" box={[43, 402, 107, 19]} text={"Account holder name"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#9aa0a5","textAlign":"left"}} />
      <Artwork node="708:698" box={[28, 453, 337, 190]} source={require('../../../../assets/figma/mobile/cda7d.svg')} />
      <Copy node="708:699" box={[108, 461, 179, 21]} text={"Generated QR code preview"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#262626","textAlign":"center"}} />
      <Artwork node="708:700" box={[32, 657, 14, 14]} source={require('../../../../assets/figma/mobile/60526.svg')} />
      <Copy node="708:701" box={[38, 658, 2, 12]} text={"i"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":9,"lineHeight":10.8,"color":"#ffffff","textAlign":"center"}} />
      <Copy node="708:702" box={[51, 653, 303, 38]} text={"No QR upload needed. The app generates it from your bank code, account number and name."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#73797e","textAlign":"left"}} />
      <Artwork node="708:705" box={[17, 772, 359, 48]} source={require('../../../../assets/figma/mobile/affa0.svg')} />
      <Copy node="708:707" box={[113, 740, 179, 12]} text={"You can review donation details before publishing."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":9,"lineHeight":10.8,"color":"#92989d","textAlign":"center"}} />
      <Surface node="708:709" box={[121, 69, 152, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="708:710" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/ecd92.svg')} />
      <Copy node="708:713" box={[146, 77, 101, 27]} text={"Create Event"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Copy node="708:714" box={[20, 122, 68, 21]} text={"Step 3 of 4"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="708:715" box={[20, 147, 353, 4]} source={require('../../../../assets/figma/mobile/a6a33.svg')} />
      <Artwork node="708:716" box={[20, 147, 235.33, 4]} source={require('../../../../assets/figma/mobile/c31e0.svg')} />
      <Copy node="708:718" box={[183, 784, 30, 24]} text={"Skip"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#43c4d6","textAlign":"center"}} />
      <Artwork node="712:744" box={[37, 485, 320, 150]} source={require('../../../../assets/figma/mobile/19457.png')} />
      <Artwork node="708:703" box={[17, 717, 359, 48]} source={require('../../../../assets/figma/mobile/1b1a8.svg')} />
      <Copy node="708:717" box={[165, 729, 65, 24]} text={"Continue"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#ffffff","textAlign":"center"}} />
      <Link node="708:705" box={[17, 772, 359, 48]} to="700:264" label={"Create Event - Step 4"} />
      <Link node="708:710" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <Link node="708:703" box={[17, 717, 359, 48]} to="700:264" label={"Create Event - Step 4"} />
    </Frame>
  );
}
