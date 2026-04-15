export type ChildAge =
  | 'babies&toddlers (0-2)'
  | 'preschool (3-5)'
  | 'kids (6-12)'

// Exact values from the what_do_you_feel_like_doing_today column
export type Mood =
  | 'Find new place for daily routine with my baby'
  | 'Plan a fun weekend together'
  | 'Discover something new for me and my child'
  | 'Find something to do on a rainy day'
  | 'Find a place where I can relax while my child is busy'
  | 'Connect with other moms'
  | ''

export interface LocationRow {
  id: number
  created_at: string
  name: string
  activity_type: string | null
  latitude: number
  longitude: number
  google_maps_link: string | null
  comments: string | null
  child_age: ChildAge[]
  place_type: string | null
  shade: string | null
  restroom: string | null
  languages: string[]
  photo: string | null
  what_do_you_feel_like_doing_today: string | null
}

export function parsePhotos(raw: string | null): string[] {
  if (!raw) return []
  return raw.split(/[\n,]/).map(s => s.trim()).filter(Boolean)
}

export interface Database {
  public: {
    Tables: {
      locations: {
        Row: LocationRow
        Insert: Omit<LocationRow, 'id' | 'created_at'>
        Update: Partial<Omit<LocationRow, 'id' | 'created_at'>>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// Filters — mood is new first filter, shade/restroom/language removed
export type PlaceType = 'everyday' | 'event' | ''
export type ViewMode = 'map' | 'list'

export interface Filters {
  mood: Mood
  childAge: ChildAge | ''
  type: PlaceType
  dateFrom: string
  dateTo: string
}

export const MOOD_OPTIONS: { value: Mood; emoji: string }[] = [
  { value: 'Find new place for daily routine with my baby',         emoji: '🌅' },
  { value: 'Plan a fun weekend together',                           emoji: '🎉' },
  { value: 'Discover something new for me and my child',            emoji: '🔍' },
  { value: 'Find something to do on a rainy day',                   emoji: '🌧️' },
  { value: 'Find a place where I can relax while my child is busy', emoji: '☕' },
  { value: 'Connect with other moms',                               emoji: '👩‍👩‍👧' },
]

export const CHILD_AGE_OPTIONS: { value: ChildAge; label: string }[] = [
  { value: 'babies&toddlers (0-2)', label: '👶 Babies & Toddlers (0–2)' },
  { value: 'preschool (3-5)',       label: '🧒 Preschool (3–5)'         },
  { value: 'kids (6-12)',           label: '🧑 Kids (6–12)'             },
]

// Language options kept for content display only (not a filter anymore)
export const LANGUAGE_OPTIONS: { value: string; label: string; flag: string }[] = [
  { value: 'portuguese', label: 'Português', flag: '🇵🇹' },
  { value: 'english',    label: 'English',   flag: '🇬🇧' },
  { value: 'russian',    label: 'Русский',   flag: '🇷🇺' },
]

export function normalisePlaceType(raw: string | null): 'everyday' | 'event' | null {
  if (!raw) return null
  const s = raw.toLowerCase().trim()
  if (s === 'every day' || s === 'everyday') return 'everyday'
  if (s === 'special date' || s === 'event') return 'event'
  return null
}

export function ageLabel(age: ChildAge, t: { age02: string; age35: string; age612: string }): string {
  if (age === 'babies&toddlers (0-2)') return t.age02
  if (age === 'preschool (3-5)') return t.age35
  return t.age612
}

export const DEFAULT_FILTERS: Filters = {
  mood: '',
  childAge: '',
  type: '',
  dateFrom: '',
  dateTo: '',
}
