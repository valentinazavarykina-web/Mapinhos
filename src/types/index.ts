export type ChildAge =
  | 'babies&toddlers (0-2)'
  | 'preschool (3-5)'
  | 'kids (6-12)'

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

// ── Filter state ──────────────────────────────────────────────────────────────
// theater removed from PlaceType — it lives as an activity_type only
export type PlaceType = 'everyday' | 'event' | ''
export type ToggleValue = 'any' | 'yes'
export type Language = 'english' | 'portuguese' | 'russian' | ''
export type ViewMode = 'map' | 'list'

export interface Filters {
  childAge: ChildAge | ''
  type: PlaceType
  dateFrom: string   // ISO date or '' — start of event date range
  dateTo: string     // ISO date or '' — end of event date range
  shade: ToggleValue
  restroom: ToggleValue
  language: Language
}

export const CHILD_AGE_OPTIONS: { value: ChildAge; label: string }[] = [
  { value: 'babies&toddlers (0-2)', label: '👶 Babies & Toddlers (0–2)' },
  { value: 'preschool (3-5)',       label: '🧒 Preschool (3–5)'         },
  { value: 'kids (6-12)',           label: '🧑 Kids (6–12)'             },
]

export const LANGUAGE_OPTIONS: { value: Language; label: string; flag: string }[] = [
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
  childAge: '',
  type: '',
  dateFrom: '',
  dateTo: '',
  shade: 'any',
  restroom: 'any',
  language: '',
}
