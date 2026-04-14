export type Locale = 'en' | 'ru'

export const LOCALES: { value: Locale; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'ru', label: 'RU' },
]

export interface Translations {
  filters: string
  childAge: string
  anyAge: string
  typeOfPlace: string
  allTypes: string
  everydayPlace: string
  eventSpecialDate: string
  eventDateFrom: string
  eventDateTo: string
  eventDateHint: string
  shadeOrShelter: string
  restroom: string
  spokenLanguage: string
  doesntMatter: string
  yes: string
  anyLanguage: string
  applyFilters: string
  clearAll: string
  mapView: string
  listView: string
  placeFound: string
  placesFound: string
  openInMaps: string
  noDescription: string
  shade: string
  wc: string
  age02: string
  age35: string
  age612: string
  activityPlayground: string
  activityPark: string
  activityCafe: string
  activityZoo: string
  activityTheater: string
  activityExhibition: string
  activityOther: string
  placeTypeEveryday: string
  placeTypeEvent: string
  noPlacesFound: string
  photos: string
  comments: string
}

const en: Translations = {
  filters: 'Filters',
  childAge: "👶 Child's age",
  anyAge: 'Any age',
  typeOfPlace: '📅 Type of place',
  allTypes: 'All',
  everydayPlace: 'Everyday place',
  eventSpecialDate: 'Event (special date)',
  eventDateFrom: '📆 From',
  eventDateTo: 'To',
  eventDateHint: 'Filter events within a date range',
  shadeOrShelter: '🌿 Shade / shelter',
  restroom: '🚻 Restroom',
  spokenLanguage: '🗣️ Spoken language',
  doesntMatter: "Doesn't matter",
  yes: 'Yes',
  anyLanguage: 'Any language',
  applyFilters: 'Apply filters',
  clearAll: 'Clear all',
  mapView: 'Map',
  listView: 'List',
  placeFound: 'place found',
  placesFound: 'places found',
  openInMaps: 'Open in Google Maps →',
  noDescription: 'No description available.',
  shade: 'Shade',
  wc: 'WC',
  age02: '0–2 yrs',
  age35: '3–5 yrs',
  age612: '6–12 yrs',
  activityPlayground: 'Playground',
  activityPark: 'Park',
  activityCafe: 'Café',
  activityZoo: 'Zoo',
  activityTheater: 'Theater',
  activityExhibition: 'Exhibition',
  activityOther: 'Place',
  placeTypeEveryday: 'Everyday',
  placeTypeEvent: 'Event',
  noPlacesFound: 'No places match your filters.',
  photos: 'Photos',
  comments: 'About this place',
}

const ru: Translations = {
  filters: 'Фильтры',
  childAge: '👶 Возраст ребёнка',
  anyAge: 'Любой возраст',
  typeOfPlace: '📅 Тип места',
  allTypes: 'Все',
  everydayPlace: 'Каждый день',
  eventSpecialDate: 'Мероприятие (особая дата)',
  eventDateFrom: '📆 С',
  eventDateTo: 'По',
  eventDateHint: 'Фильтр мероприятий по периоду',
  shadeOrShelter: '🌿 Тень / навес',
  restroom: '🚻 Туалет',
  spokenLanguage: '🗣️ Язык общения',
  doesntMatter: 'Не важно',
  yes: 'Да',
  anyLanguage: 'Любой язык',
  applyFilters: 'Применить',
  clearAll: 'Сбросить',
  mapView: 'Карта',
  listView: 'Список',
  placeFound: 'место найдено',
  placesFound: 'мест найдено',
  openInMaps: 'Открыть в Google Maps →',
  noDescription: 'Описание отсутствует.',
  shade: 'Тень',
  wc: 'Туалет',
  age02: '0–2 года',
  age35: '3–5 лет',
  age612: '6–12 лет',
  activityPlayground: 'Площадка',
  activityPark: 'Парк',
  activityCafe: 'Кафе',
  activityZoo: 'Зоопарк',
  activityTheater: 'Театр',
  activityExhibition: 'Выставка',
  activityOther: 'Место',
  placeTypeEveryday: 'Каждый день',
  placeTypeEvent: 'Мероприятие',
  noPlacesFound: 'Нет мест по заданным фильтрам.',
  photos: 'Фотографии',
  comments: 'О месте',
}

export const translations: Record<Locale, Translations> = { en, ru }
