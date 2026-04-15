import { useState, useCallback } from 'react'
import { FilterPanel } from '@/components/FilterPanel'
import { MapView } from '@/components/MapView'
import { ListView } from '@/components/ListView'
import { LocationCard } from '@/components/LocationCard'
import { useLocations } from '@/hooks/useLocations'
import { useFilters } from '@/hooks/useFilters'
import { useLocale } from '@/hooks/useLocale'
import { LOCALES } from '@/i18n'
import type { LocationRow, ViewMode } from '@/types'

export default function App() {
  const { t, locale, setLocale } = useLocale()
  const [panelOpen, setPanelOpen] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('map')
  const [selected, setSelected] = useState<LocationRow | null>(null)

  const {
    filters, pendingFilters, activeCount,
    setMood, setChildAge, setType, setDateFrom, setDateTo,
    apply, reset,
  } = useFilters()

  const { locations, loading, error } = useLocations(filters)

  const handleApply  = useCallback(() => { apply(); setPanelOpen(false) }, [apply])
  const handleReset  = useCallback(() => { reset(); setPanelOpen(false) }, [reset])
  const handleSelect = useCallback((loc: LocationRow) => setSelected(loc), [])
  const handleClose  = useCallback(() => setSelected(null), [])

  const resultLabel = locations.length === 1 ? t.placeFound : t.placesFound

  return (
    <div className="layout">

      <header className="header">
        <div className="logo">Mapi<em>nhos</em></div>

        <div className="header-controls">
          {/* Map / List toggle */}
          <div className="view-toggle">
            <button
              className={`view-toggle__btn${viewMode === 'map' ? ' view-toggle__btn--active' : ''}`}
              onClick={() => setViewMode('map')}
            >🗺 {t.mapView}</button>
            <button
              className={`view-toggle__btn${viewMode === 'list' ? ' view-toggle__btn--active' : ''}`}
              onClick={() => setViewMode('list')}
            >☰ {t.listView}</button>
          </div>

          {/* Language switcher — EN / RU / PT */}
          <div className="lang-switcher">
            {LOCALES.map(l => (
              <button
                key={l.value}
                className={`lang-btn${locale === l.value ? ' lang-btn--active' : ''}`}
                onClick={() => setLocale(l.value)}
              >{l.label}</button>
            ))}
          </div>

          {/* Filter toggle */}
          <button
            className="filter-toggle"
            onClick={() => setPanelOpen(o => !o)}
            aria-expanded={panelOpen}
          >
            ⚙ {t.filters}
            {activeCount > 0 && (
              <span className="filter-toggle__badge">{activeCount}</span>
            )}
          </button>
        </div>
      </header>

      <FilterPanel
        isOpen={panelOpen}
        mood={pendingFilters.mood}
        childAge={pendingFilters.childAge}
        type={pendingFilters.type}
        dateFrom={pendingFilters.dateFrom}
        dateTo={pendingFilters.dateTo}
        t={t}
        onMood={setMood}
        onChildAge={setChildAge}
        onType={setType}
        onDateFrom={setDateFrom}
        onDateTo={setDateTo}
        onApply={handleApply}
        onReset={handleReset}
      />

      <main className="main">
        {error && <div className="error-banner">⚠️ {error}</div>}
        {viewMode === 'map'
          ? <MapView locations={locations} loading={loading} onSelect={handleSelect} />
          : <ListView locations={locations} t={t} onSelect={handleSelect} />
        }
        <div className="results-bar" aria-live="polite">
          <strong>{locations.length}</strong> {resultLabel}
        </div>
      </main>

      {selected && (
        <LocationCard location={selected} t={t} onClose={handleClose} />
      )}
    </div>
  )
}
