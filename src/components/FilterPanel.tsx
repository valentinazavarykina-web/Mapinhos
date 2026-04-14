import type { ChildAge, Language, PlaceType, ToggleValue } from '@/types'
import { CHILD_AGE_OPTIONS, LANGUAGE_OPTIONS } from '@/types'
import type { Translations } from '@/i18n'

interface FilterPanelProps {
  isOpen: boolean
  childAge: ChildAge | ''
  type: PlaceType
  dateFrom: string
  dateTo: string
  shade: ToggleValue
  restroom: ToggleValue
  language: Language
  t: Translations
  onChildAge: (age: ChildAge | '') => void
  onType: (t: PlaceType) => void
  onDateFrom: (d: string) => void
  onDateTo: (d: string) => void
  onShade: (v: ToggleValue) => void
  onRestroom: (v: ToggleValue) => void
  onLanguage: (l: Language) => void
  onApply: () => void
  onReset: () => void
}

export function FilterPanel(props: FilterPanelProps) {
  const {
    isOpen, childAge, type, dateFrom, dateTo, shade, restroom, language, t,
    onChildAge, onType, onDateFrom, onDateTo, onShade, onRestroom, onLanguage,
    onApply, onReset,
  } = props

  return (
    <div className={`filter-panel${isOpen ? ' filter-panel--open' : ''}`}>
      <div className="filter-grid">

        {/* Child age */}
        <div className="filter-group">
          <label className="filter-label">{t.childAge}</label>
          <select value={childAge} onChange={e => onChildAge(e.target.value as ChildAge | '')}>
            <option value="">{t.anyAge}</option>
            {CHILD_AGE_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Place type — no theater option */}
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

        {/* Shade */}
        <div className="filter-group">
          <label className="filter-label">{t.shadeOrShelter}</label>
          <div className="toggle-row">
            <button className={`toggle-btn${shade === 'any' ? ' toggle-btn--active' : ''}`} onClick={() => onShade('any')}>
              {t.doesntMatter}
            </button>
            <button className={`toggle-btn${shade === 'yes' ? ' toggle-btn--active' : ''}`} onClick={() => onShade('yes')}>
              {t.yes}
            </button>
          </div>
        </div>

        {/* Restroom */}
        <div className="filter-group">
          <label className="filter-label">{t.restroom}</label>
          <div className="toggle-row">
            <button className={`toggle-btn${restroom === 'any' ? ' toggle-btn--active' : ''}`} onClick={() => onRestroom('any')}>
              {t.doesntMatter}
            </button>
            <button className={`toggle-btn${restroom === 'yes' ? ' toggle-btn--active' : ''}`} onClick={() => onRestroom('yes')}>
              {t.yes}
            </button>
          </div>
        </div>

        {/* Language */}
        <div className="filter-group">
          <label className="filter-label">{t.spokenLanguage}</label>
          <select value={language} onChange={e => onLanguage(e.target.value as Language)}>
            <option value="">{t.anyLanguage}</option>
            {LANGUAGE_OPTIONS.map(l => (
              <option key={l.value} value={l.value}>{l.flag} {l.label}</option>
            ))}
          </select>
        </div>

      </div>

      <div className="filter-actions">
        <button className="btn btn--primary" onClick={onApply}>{t.applyFilters}</button>
        <button className="btn btn--secondary" onClick={onReset}>{t.clearAll}</button>
      </div>
    </div>
  )
}
