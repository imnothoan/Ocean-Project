import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 258:792 · Event Registration
export function EventRegistrationScreen() {
  return (
    <Frame id="258:792" width={393.0} height={852} background={"#ffffff"}>
      <Artwork node="258:793" box={[1, 0, 392, 852]} source={require('../../../../assets/figma/mobile/58c51.svg')} />
      <Artwork node="258:794" box={[20, 152, 353, 76]} source={require('../../../../assets/figma/mobile/72e62.svg')} />
      <Copy node="258:795" box={[35, 164, 181, 27]} text={"My Khe Beach Cleanup"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#202326","textAlign":"left"}} />
      <Copy node="258:796" box={[35, 194, 167, 20]} text={"Oct 20 · 6:30 AM · Da Nang"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":15,"lineHeight":18.0,"color":"#73787d","textAlign":"left"}} />
      <Copy node="258:797" box={[20, 251, 164, 24]} text={"Participant information"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#202326","textAlign":"left"}} />
      <Copy node="258:798" box={[22, 284, 61, 21]} text={"Full name"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:799" box={[19.5, 307.5, 354, 48]} source={require('../../../../assets/figma/mobile/52119.svg')} />
      <Copy node="258:800" box={[34, 321, 97, 21]} text={"Full name"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":19.2,"color":"#202326","textAlign":"left"}} />
      <Copy node="258:801" box={[22, 371, 87, 21]} text={"Email address"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:802" box={[19.5, 394.5, 354, 48]} source={require('../../../../assets/figma/mobile/52119.svg')} />
      <Copy node="258:803" box={[34, 408, 165, 21]} text={"Email address"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":19.2,"color":"#202326","textAlign":"left"}} />
      <Copy node="258:804" box={[22, 455, 92, 21]} text={"Phone number"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:805" box={[19.5, 478.5, 354, 48]} source={require('../../../../assets/figma/mobile/52119.svg')} />
      <Copy node="258:806" box={[34, 492, 97, 21]} text={"Phone number"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":19.2,"color":"#202326","textAlign":"left"}} />
      <Copy node="258:807" box={[20, 560, 194, 24]} text={"How would you like to help?"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#202326","textAlign":"left"}} />
      <Artwork node="258:808" box={[20, 596, 105, 30]} source={require('../../../../assets/figma/mobile/43bc6.svg')} />
      <Copy node="258:809" box={[30, 600, 85, 21]} text={"Collect waste"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#ffffff","textAlign":"center"}} />
      <Artwork node="258:810" box={[131, 596, 125, 30]} source={require('../../../../assets/figma/mobile/5b057.svg')} />
      <Copy node="258:811" box={[143.5, 600, 99, 21]} text={"Sort recyclables"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="258:812" box={[262, 596, 112, 30]} source={require('../../../../assets/figma/mobile/ae6ca.svg')} />
      <Copy node="258:813" box={[280, 600, 76, 21]} text={"Take photos"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#3f596b","textAlign":"center"}} />
      <Artwork node="258:814" box={[20, 768, 353, 50]} source={require('../../../../assets/figma/mobile/c4cb4.svg')} />
      <Copy node="258:815" box={[125, 781, 143, 24]} text={"Confirm registration"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#ffffff","textAlign":"center"}} />
      <Surface node="258:817" box={[95, 69, 201, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="258:818" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/ecd92.svg')} />
      <Copy node="258:821" box={[124, 76, 142, 27]} text={"Event Registration"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Link node="258:814" box={[20, 768, 353, 50]} to="258:906" label={"My Event"} />
      <Link node="258:818" box={[23, 69, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
