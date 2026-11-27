import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 258:735 · Event Detail
export function EventDetailScreen() {
  return (
    <Frame id="258:735" width={393.0} height={941} background={"#ffffff"}>
      <Artwork node="258:736" box={[0, 0, 393, 941]} source={require('../../../../assets/figma/mobile/4d995.svg')} />
      <Copy node="258:737" box={[20, 325, 218, 32]} text={"My Khe Beach Cleanup"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":24,"lineHeight":28.8,"color":"#202326","textAlign":"left"}} />
      <Copy node="258:738" box={[20, 361, 213, 21]} text={"A morning for a cleaner coastline."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Artwork node="258:739" box={[19.5, 395.5, 354, 81]} source={require('../../../../assets/figma/mobile/7261e.svg')} />
      <Copy node="258:740" box={[81, 408, 162, 21]} text={"Sunday, Oct 20 · 6:30 AM"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#202326","textAlign":"left"}} />
      <Copy node="258:741" box={[81, 439, 155, 21]} text={"My Khe Beach, Da Nang"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Copy node="258:742" box={[20, 490, 102, 21]} text={"About this event"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#202326","textAlign":"left"}} />
      <Copy node="258:743" box={[20, 514, 349, 42]} text={"Join us to collect, sort, and document waste to help protect marine ecosystems."} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":16,"lineHeight":19.2,"color":"#73787d","textAlign":"left"}} />
      <Copy node="712:759" box={[18, 610, 154, 20]} text={"$161.00 / $225.00"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":15,"lineHeight":18.0,"color":"#73787d","textAlign":"left"}} />
      <Copy node="258:745" box={[20, 653, 85, 21]} text={"Organized by"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#202326","textAlign":"left"}} />
      <Copy node="258:746" box={[65, 682, 132, 21]} text={"Ocean Care Vietnam"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#202326","textAlign":"left"}} />
      <Copy node="258:747" box={[65, 701, 163, 19]} text={"Verified community organizer"} typeStyle={{"fontFamily":"AfacadFlux_400Regular","fontSize":14,"lineHeight":16.8,"color":"#73787d","textAlign":"left"}} />
      <Copy node="258:748" box={[20, 750, 125, 21]} text={"12 / 30 participants"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#202326","textAlign":"left"}} />
      <Artwork node="258:749" box={[20, 778, 353, 5]} source={require('../../../../assets/figma/mobile/209b4.svg')} />
      <Artwork node="258:750" box={[20, 778, 141, 5]} source={require('../../../../assets/figma/mobile/87ecf.svg')} />
      <Copy node="712:755" box={[20, 574, 125, 21]} text={"Donation campaign"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":16,"lineHeight":19.2,"color":"#202326","textAlign":"left"}} />
      <Artwork node="712:756" box={[20, 600, 353, 5]} source={require('../../../../assets/figma/mobile/209b4.svg')} />
      <Artwork node="712:757" box={[20, 600, 258, 5]} source={require('../../../../assets/figma/mobile/5e26d.svg')} />
      <Artwork node="258:751" box={[20, 826, 353, 50]} source={require('../../../../assets/figma/mobile/4694e.svg')} />
      <Copy node="258:752" box={[134, 839, 125, 24]} text={"Register for event"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":18,"lineHeight":21.6,"color":"#ffffff","textAlign":"center"}} />
      <Artwork node="258:763" box={[20, 130, 353, 186]} radius={10} fit="cover" source={require('../../../../assets/figma/mobile/7e54a.jpg')} />
      <Artwork node="258:767" box={[23, 685, 34, 34]} fit="cover" source={require('../../../../assets/figma/mobile/d9989.png')} />
      <Artwork node="258:770" box={[46, 441, 18, 18]} source={require('../../../../assets/figma/mobile/dfcf6.svg')} />
      <Artwork node="258:771" box={[46, 410, 18, 18]} source={require('../../../../assets/figma/mobile/3cc1d.svg')} />
      <Surface node="258:754" box={[121, 69, 151, 43]} fill={"#a5e0f2"} radius={20} />
      <Artwork node="258:755" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/ca774.svg')} />
      <Artwork node="258:758" box={[324, 69, 43, 43]} source={require('../../../../assets/figma/mobile/59267.svg')} />
      <Artwork node="258:760" box={[334, 79, 24, 24]} source={require('../../../../assets/figma/mobile/57e4f.svg')} />
      <Copy node="258:761" box={[148, 76, 95, 27]} text={"Event Detail"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Link node="258:751" box={[20, 826, 353, 50]} to="258:792" label={"Event Registration"} />
      <Link node="258:755" box={[23, 69, 43, 43]} to="back" label={"Back"} />
    </Frame>
  );
}
