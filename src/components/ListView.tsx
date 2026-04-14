import type { LocationRow } from '@/types'
import { parsePhotos, ageLabel, normalisePlaceType } from '@/types'
import { parseActivities } from '@/lib/activityTypes'
import type { Translations } from '@/i18n'

interface ListViewProps {
  locations: LocationRow[]
  t: Translations
  onSelect: (location: LocationRow) => void
}

export function ListView({ locations, t, onSelect }: ListViewProps) {
  if (locations.length === 0) {
    return (
      <div className="list-empty">
        <p>{t.noPlacesFound}</p>
      </div>
    )
  }

  return (
    <div className="list-view">
      {locations.map(loc => {
        const photos = parsePhotos(loc.photo)
        const activities = parseActivities(loc.activity_type)
        const type = normalisePlaceType(loc.place_type)
        const thumb = photos[0]

        return (
          <button
            key={loc.id}
            className="list-item"
            onClick={() => onSelect(loc)}
          >
            {/* Thumbnail */}
            <div className="list-item__thumb">
              {thumb ? (
                <img
                  src={thumb}
                  alt={loc.name}
                  className="list-item__img"
                  onError={e => {
                    const el = e.target as HTMLImageElement
                    el.style.display = 'none'
                    el.parentElement!.classList.add('list-item__thumb--placeholder')
                  }}
                />
              ) : (
                <div className="list-item__thumb--placeholder">
                  <span style={{ fontSize: 24 }}>{activities[0].emoji}</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="list-item__info">
              <div className="list-item__pills">
                {activities.map(a => (
                  <span
                    key={a.key}
                    className="list-pill"
                    style={{ background: a.color }}
                  >
                    {a.emoji}
                  </span>
                ))}
                {type && (
                  <span className="list-pill list-pill--type">
                    {type === 'everyday' ? t.placeTypeEveryday : type === 'event' ? t.placeTypeEvent : '🎭'}
                  </span>
                )}
              </div>

              <div className="list-item__name">{loc.name}</div>

              <div className="list-item__meta">
                {loc.child_age.length > 0 && (
                  <span>👶 {loc.child_age.map(a => ageLabel(a, t)).join(', ')}</span>
                )}
                {loc.shade === 'yes' && <span>🌿</span>}
                {loc.restroom === 'yes' && <span>🚻</span>}
              </div>
            </div>

            <span className="list-item__arrow">›</span>
          </button>
        )
      })}
    </div>
  )
}
