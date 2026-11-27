create table public.field_guides (
  slug text primary key,
  kind text not null check(kind in ('waste','species','tips')),
  title text not null,
  categories text[] not null check(cardinality(categories)>0),
  summary text not null,
  detail text not null,
  frame_id text check(frame_id in ('269:124','274:297','682:5569')),
  source_name text not null,
  source_url text not null check(source_url like 'https://%'),
  sort_order integer not null
);
alter table public.field_guides enable row level security;
revoke all on public.field_guides from public,anon,authenticated;
grant select on public.field_guides to anon,authenticated;
create policy "read field guides" on public.field_guides for select to anon, authenticated using(true);

-- Editorial reference material. No sightings, members or local collection sites are seeded.
insert into public.field_guides values
('paper','waste','Paper & cardboard',array['Paper'],'Clean and dry','Flatten boxes. Check which paper products the local collector accepts.',null,'US EPA','https://www.epa.gov/recycle/how-do-i-recycle-common-recyclables',1),
('pet','waste','Plastic bottle',array['Plastic'],'Bottles & packaging','Empty the bottle and check the local recycling program before putting it in a recycling bin.','269:124','US EPA','https://www.epa.gov/recycle/how-do-i-recycle-common-recyclables',2),
('glass','waste','Glass',array['Glass'],'Jars and bottles','Ask the collector about acceptable glass colors. Cookware and mirrors can require a different collection stream.',null,'US EPA','https://www.epa.gov/recycle/how-do-i-recycle-common-recyclables',3),
('metal','waste','Metal',array['Metal'],'Food and drink cans','Empty cans and follow the guidance of your local collection program.',null,'US EPA','https://www.epa.gov/recycle/how-do-i-recycle-common-recyclables',4),
('organic','waste','Organic waste',array['Organic'],'Food scraps and yard trimmings','Check which scraps can be composted at home or through your collection service.',null,'US EPA','https://www.epa.gov/recycle/composting-home',5),
('batteries','waste','Batteries',array['Special'],'Separate collection','Find the collection route for the battery chemistry. Rechargeable and lithium batteries require special handling.',null,'US EPA','https://www.epa.gov/recycle/how-do-i-recycle-common-recyclables',6),
('green-turtle','species','Green sea turtle',array['Marine'],'Chelonia mydas','Green turtles live in tropical and subtropical waters. Conservation status varies by population.','274:297','NOAA Fisheries','https://www.fisheries.noaa.gov/species/green-turtle',1),
('jellyfish','species','Jellyfish',array['Marine'],'Ocean invertebrates','Jellyfish use stinging cells to capture food. Observe them without touching.',null,'NOAA Ocean Service','https://oceanservice.noaa.gov/facts/jellyfish.html',2),
('blue-whale','species','Blue whale',array['Marine','Mammals'],'Balaenoptera musculus','Blue whales are baleen whales that feed primarily on krill.',null,'NOAA Fisheries','https://www.fisheries.noaa.gov/species/blue-whale',3),
('crested-tern','species','Greater crested tern',array['Birds','Marine'],'Thalasseus bergii','Explore the accepted scientific name and taxonomic classification in the GBIF record.',null,'GBIF','https://www.gbif.org/species/5789283',4),
('douc','species','Red-shanked douc',array['Forest','Mammals'],'Pygathrix nemaeus','Explore the scientific name and taxonomic classification of this primate in the GBIF record.',null,'GBIF','https://www.gbif.org/species/2436529',5),
('water-bottle','tips','Carry a reusable bottle',array['Food'],'Refill when safe drinking water is available','Pack a bottle that can be washed and refilled.','682:5569','US EPA','https://www.epa.gov/recycle/what-you-can-do',1),
('compost','tips','Start composting',array['Home'],'Use suitable food scraps','Combine suitable food scraps and dry materials. Check which materials your compost system accepts.',null,'US EPA','https://www.epa.gov/recycle/composting-home',2),
('water','tips','Conserve water',array['Home'],'Use only the water you need','Turn off the tap when it is not needed.',null,'NOAA Ocean Service','https://oceanservice.noaa.gov/ocean/earthday.html',3),
('bags','tips','Carry a reusable bag',array['Shopping'],'Reuse your shopping bags','Keep a reusable bag handy and use it on the next shopping trip.',null,'US EPA','https://www.epa.gov/recycle/what-you-can-do',4),
('travel','tips','Bring reusables when travelling',array['Travel'],'Pack a reusable bottle or food container','Use suitable refill points and bring reusable containers on outings.',null,'US EPA','https://www.epa.gov/recycle/what-you-can-do',5);
