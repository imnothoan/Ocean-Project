import { ApplicantDetail } from '../VolunteerLists';
import { Artwork, Copy, Frame, Link, Surface } from '../components';

// Figma 614:766 · Q - 35
export function Q35Screen() {
  return (
    <Frame id="614:766" width={393.0} height={1523} background={"#ffffff"}>
      <Artwork node="614:768" box={[23, 69, 43, 43]} source={require('../../../../assets/figma/mobile/9e88c.svg')} />
      <Surface node="614:772" box={[85, 69, 223, 43]} fill={"#a5e0f2"} radius={20} />
      <Copy node="614:773" box={[113, 76, 168, 27]} text={"Volunteer Application"} typeStyle={{"fontFamily":"AfacadFlux_700Bold","fontSize":20,"lineHeight":24.0,"color":"#3f596b","textAlign":"left"}} />
      <Link node="614:768" box={[23, 69, 43, 43]} to="back" label={"Back"} />
      <ApplicantDetail/>
    </Frame>
  );
}
