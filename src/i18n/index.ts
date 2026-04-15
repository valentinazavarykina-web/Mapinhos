export type Locale = 'en' | 'ru' | 'pt'

export const LOCALES: { value: Locale; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'ru', label: 'RU' },
  { value: 'pt', label: 'PT' },
]

export interface Translations {
  // Header
  filters: string
  // Filter labels
  whatDoYouFeelLike: string
  anyMood: string
  childAge: string
  anyAge: string
  typeOfPlace: string
  allTypes: string
  everydayPlace: string
  eventSpecialDate: string
  eventDateFrom: string
  eventDateTo: string
  eventDateHint: string
  applyFilters: string
  clearAll: string
  // View toggle
  mapView: string
  listView: string
  // Results
  placeFound: string
  placesFound: string
  // Card
  openInMaps: string
  noDescription: string
  shade: string
  wc: string
  comments: string
  photos: string
  // Age labels
  age02: string
  age35: string
  age612: string
  // Activity types
  activityPlayground: string
  activityPark: string
  activityCafe: string
  activityZoo: string
  activityTheater: string
  activityExhibition: string
  activityOther: string
  // Place type labels
  placeTypeEveryday: string
  placeTypeEvent: string
  // List
  noPlacesFound: string
  // Mood labels (UI display)
  moodDailyRoutine: string
  moodWeekend: string
  moodDiscoverNew: string
  moodRainyDay: string
  moodRelax: string
  moodMoms: string
}

const en: Translations = {
  filters: 'Filters',
  whatDoYouFeelLike: '✨ What do you feel like doing today?',
  anyMood: 'Any mood',
  childAge: "👶 Child's age",
  anyAge: 'Any age',
  typeOfPlace: '📅 Type of place',
  allTypes: 'All',
  everydayPlace: 'Everyday place',
  eventSpecialDate: 'Event (special date)',
  eventDateFrom: '📆 From',
  eventDateTo: 'To',
  eventDateHint: 'Filter events within a date range',
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
  comments: 'About this place',
  photos: 'Photos',
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
  moodDailyRoutine: 'Daily routine with my baby',
  moodWeekend: 'Fun weekend together',
  moodDiscoverNew: 'Discover something new',
  moodRainyDay: 'Something for a rainy day',
  moodRelax: 'Relax while my child plays',
  moodMoms: 'Connect with other moms',
}

const ru: Translations = {
  filters: 'Фильтры',
  whatDoYouFeelLike: '✨ Чем хочется заняться сегодня?',
  anyMood: 'Любое настроение',
  childAge: '👶 Возраст ребёнка',
  anyAge: 'Любой возраст',
  typeOfPlace: '📅 Тип места',
  allTypes: 'Все',
  everydayPlace: 'Каждый день',
  eventSpecialDate: 'Мероприятие (особая дата)',
  eventDateFrom: '📆 С',
  eventDateTo: 'По',
  eventDateHint: 'Период мероприятия',
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
  comments: 'О месте',
  photos: 'Фотографии',
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
  moodDailyRoutine: 'Рутина с малышом',
  moodWeekend: 'Весёлые выходные',
  moodDiscoverNew: 'Открыть что-то новое',
  moodRainyDay: 'Что делать в дождь',
  moodRelax: 'Отдохнуть, пока ребёнок занят',
  moodMoms: 'Познакомиться с мамами',
}

const pt: Translations = {
  filters: 'Filtros',
  whatDoYouFeelLike: '✨ O que te apetece fazer hoje?',
  anyMood: 'Qualquer humor',
  childAge: '👶 Idade da criança',
  anyAge: 'Qualquer idade',
  typeOfPlace: '📅 Tipo de lugar',
  allTypes: 'Todos',
  everydayPlace: 'Lugar do dia a dia',
  eventSpecialDate: 'Evento (data especial)',
  eventDateFrom: '📆 De',
  eventDateTo: 'Até',
  eventDateHint: 'Filtrar eventos por período',
  applyFilters: 'Aplicar filtros',
  clearAll: 'Limpar',
  mapView: 'Mapa',
  listView: 'Lista',
  placeFound: 'lugar encontrado',
  placesFound: 'lugares encontrados',
  openInMaps: 'Abrir no Google Maps →',
  noDescription: 'Sem descrição disponível.',
  shade: 'Sombra',
  wc: 'Casa de banho',
  comments: 'Sobre este lugar',
  photos: 'Fotos',
  age02: '0–2 anos',
  age35: '3–5 anos',
  age612: '6–12 anos',
  activityPlayground: 'Parque infantil',
  activityPark: 'Parque',
  activityCafe: 'Café',
  activityZoo: 'Jardim zoológico',
  activityTheater: 'Teatro',
  activityExhibition: 'Exposição',
  activityOther: 'Lugar',
  placeTypeEveryday: 'Dia a dia',
  placeTypeEvent: 'Evento',
  noPlacesFound: 'Nenhum lugar corresponde aos filtros.',
  moodDailyRoutine: 'Rotina diária com o bebé',
  moodWeekend: 'Fim de semana divertido',
  moodDiscoverNew: 'Descobrir algo novo',
  moodRainyDay: 'Fazer algo num dia de chuva',
  moodRelax: 'Relaxar enquanto a criança brinca',
  moodMoms: 'Conhecer outras mães',
}

export const translations: Record<Locale, Translations> = { en, ru, pt }
