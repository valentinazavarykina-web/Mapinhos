-- ============================================================
-- Mapinhos — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

drop table if exists public.locations;

create table public.locations (
  id            bigint generated always as identity primary key,
  created_at    timestamptz default now() not null,
  name          text not null,
  activity_type text,
  latitude      double precision not null,
  longitude     double precision not null,
  google_maps_link text,
  comments      text,
  child_age     text[] default '{}',
  place_type    text,
  shade         text,
  restroom      text,
  languages     text[] default '{}',
  photo         text
);

alter table public.locations enable row level security;
create policy "Public read" on public.locations for select using (true);

insert into public.locations (name, activity_type, latitude, longitude, google_maps_link, comments, child_age, place_type, shade, restroom, languages) values
('Parque Infantil dos Cascalitos','Playground',38.68058246117618,-9.324075214600642,'Parque Infantil dos Cascalitos',null,array['babies&toddlers (0-2)','preschool (3-5)','kids (6-12)'],'every day','doesn''t matter','doesn''t matter',array['english','portuguese','russian']),
('Jardim Constantino','Playground',38.69007773614598,-9.32897694245143,'Jardim Constantino',null,array[]::text[],null,null,null,array['english','portuguese','russian']),
('Quinta do Pisao','Park',38.75875802345759,-9.419167088355193,'https://maps.app.goo.gl/x2GWZ84WgcnDkmYeA?g_st=ic',null,array['babies&toddlers (0-2)','preschool (3-5)','kids (6-12)'],null,null,'yes',array['english','portuguese','russian']),
('Oeiras Municipal Garden','Playground',38.6896181959698,-9.314368566702237,'Children playground',null,array['babies&toddlers (0-2)','preschool (3-5)','kids (6-12)'],'every day','yes','yes',array['english','portuguese','russian']),
('Jardim Morais','Playground',38.68851996103819,-9.356004460603543,'Jardim Moraes',null,array[]::text[],null,null,null,array['english','portuguese','russian']),
('Urban Park Farm Rana','Playground',38.69591720213732,-9.345305475164126,'Urban Park Farm Rana',null,array['babies&toddlers (0-2)','preschool (3-5)'],'every day','yes',null,array['english','portuguese','russian']),
('Parque Infantil Quinta de Santo António','Playground',38.71016617627742,-9.229578988629488,'Parque Infantil Quinta de Santo António',null,array[]::text[],null,null,null,array[]::text[]),
('Jardim da Quinta da Alagoa','Playground',38.693842704527405,-9.338411154999505,'Jardim da Quinta da Alagoa',null,array['babies&toddlers (0-2)','preschool (3-5)','kids (6-12)'],'every day','yes',null,array['english','portuguese','russian']),
('Baby Beans','Café',38.71999297399126,-9.164929869315845,'Baby Beans',null,array[]::text[],'every day',null,null,array[]::text[]),
('Cantinho dos Póneis','Zoo',38.837174197752944,-9.374692255822401,'Cantinho dos Póneis - Sintra (apenas por reserva online)',null,array[]::text[],'every day',null,null,array[]::text[]),
('Quinta Santo António - Parque Infantil e Juvenil Coberto','Playground',38.71320639148459,-9.214870887163443,'Quinta Santo António - Parque Infantil e Juvenil Coberto',null,array[]::text[],'every day','yes',null,array[]::text[]),
('Miami Mami','Café',38.703181545975816,-9.39246802883552,'Miami Mami',null,array[]::text[],'every day','yes','yes',array[]::text[]),
('Quinta de São Gonçalo Playground','Playground',38.68199965365727,-9.327311971219732,'Quinta de São Gonçalo Playground',null,array['babies&toddlers (0-2)','preschool (3-5)','kids (6-12)'],'every day','yes',null,array['english','portuguese','russian']),
('Jardim Infantile','Playground',38.68368592272749,-9.328975880716797,'Parque Infantil da Quinta dos Lombos',null,array['babies&toddlers (0-2)','preschool (3-5)','kids (6-12)'],'every day','doesn''t matter','doesn''t matter',array['english','portuguese','russian']),
('Poetas Park Playground','Playground',38.70143944105261,-9.304123984235503,'Poetas Park Playground',null,array[]::text[],null,null,null,array[]::text[]);
