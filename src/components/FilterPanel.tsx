import type { ChildAge, PlaceType, Mood } from '@/types'
import { CHILD_AGE_OPTIONS, MOOD_OPTIONS } from '@/types'
import type { Translations } from '@/i18n'

interface FilterPanelProps {
  isOpen: boolean
  mood: Mood
  childAge: ChildAge | ''
  type: PlaceType
  dateFrom: string
  dateTo: string
  t: Translations
  onMood: (m: Mood) => void
  onChildAge: (age: ChildAge | '') => void
  onType: (t: PlaceType) => void
  onDateFrom: (d: string) => void
  onDateTo: (d: string) => void
  onApply: () => void
  onReset: () => void
}

// Map DB mood value → translated label key
function moodLabel(value: Mood, t: Translations): string {
  const map: Record<string, string> = {
    'Find new place for daily routine with my baby':         t.moodDailyRoutine,
    'Plan a fun weekend together':                           t.moodWeekend,
    'Discover something new for me and my child':            t.moodDiscoverNew,
    'Find something to do on a rainy day':                   t.moodRainyDay,
    'Find a place where I can relax while my child is busy': t.moodRelax,
    'Connect with other moms':                               t.moodMoms,
  }
  return map[value] ?? value
}

export function FilterPanel(props: FilterPanelProps) {
  const {
    isOpen, mood, childAge, type, dateFrom, dateTo, t,
    onMood, onChildAge, onType, onDateFrom, onDateTo,
    onApply, onReset,
  } = props

  return (
    <div className={`filter-panel${isOpen ? ' filter-panel--open' : ''}`}>
      <div className="filter-grid">

        {/* 1. What do you feel like doing today? */}
        <div className="filter-group filter-group--full">
          <label className="filter-label">{t.whatDoYouFeelLike}</label>
          <select value={mood} onChange={e => onMood(e.target.value as Mood)}>
            <option value="">{t.anyMood}</option>
            {MOOD_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>
                {o.emoji} {moodLabel(o.value, t)}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Child's age */}
        <div className="filter-group">
          <label className="filter-label">{t.childAge}</label>
          <select value={childAge} onChange={e => onChildAge(e.target.value as ChildAge | '')}>
            <option value="">{t.anyAge}</option>
            {CHILD_AGE_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* 3. Place type */}
        <div className="filter-group">
          <label className="filter-label">{t.typeOfPlace}</label>
          <select value={type} onChange={e => onType(e.target.value as PlaceType)}>
            <option value="">{t.allTypes}</option>
            <option value="everyday">{t.everydayPlace}</option>
            <option value="event">{t.eventSpecialDate}</option>
          </select>
        </div>

        {/* Date range — only when type === 'event' */}
        {type === 'event' && (
          <div className="filter-group filter-group--full">
            <label className="filter-label">{t.eventDateHint}</label>
            <div className="date-range-row">
              <div className="date-range-field">
                <span className="date-range-label">{t.eventDateFrom}</span>
                <input
                  type="date"
                  value={dateFrom}
                  max={dateTo || undefined}
                  onChange={e => onDateFrom(e.target.value)}
                />
              </div>
              <div className="date-range-sep">—</div>
              <div className="date-range-field">
                <span className="date-range-label">{t.eventDateTo}</span>
                <input
                  type="date"
                  value={dateTo}
                  min={dateFrom || undefined}
                  onChange={e => onDateTo(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

      </div>

      <div className="filter-actions">
        <button className="btn btn--primary" onClick={onApply}>{t.applyFilters}</button>
        <button className="btn btn--secondary" onClick={onReset}>{t.clearAll}</button>
      </div>
    </div>
  )
}
