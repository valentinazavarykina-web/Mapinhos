import type { LocationRow } from '@/types'
import { LANGUAGE_OPTIONS, normalisePlaceType } from '@/types'

interface PlacePopupProps {
  location: LocationRow
}

export function PlacePopup({ location }: PlacePopupProps) {
  const type = normalisePlaceType(location.place_type)

  const langLabel = (code: string) =>
    LANGUAGE_OPTIONS.find(l => l.value === code)

  const googleUrl = location.google_maps_link?.startsWith('http')
    ? location.google_maps_link
    : `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`

  return (
    <div className="popup">
      <div className="popup__header">
        <div className="popup__type">
          {location.activity_type ?? (type === 'event' ? 'Event' : 'Place')}
        </div>
        <div className="popup__name">{location.name}</div>
      </div>

      <div className="popup__body">
        {location.comments && (
          <p className="popup__desc">{location.comments}</p>
        )}

        <div className="popup__amenities">
          {location.child_age.length > 0 && (
            <span className="popup__amenity">
              👶 {location.child_age.map(a =>
                a === 'babies&toddlers (0-2)' ? '0–2'
                : a === 'preschool (3-5)' ? '3–5'
                : '6–12'
              ).join(', ')} yrs
            </span>
          )}
          {location.shade === 'yes' && (
            <span className="popup__amenity">🌿 Shade</span>
          )}
          {location.restroom === 'yes' && (
            <span className="popup__amenity">🚻 WC</span>
          )}
        </div>

        {location.languages.length > 0 && (
          <div className="popup__tags">
            {location.languages.map(code => {
              const lang = langLabel(code)
              return (
                <span key={code} className="popup__tag">
                  {lang ? `${lang.flag} ${lang.label}` : code}
                </span>
              )
            })}
          </div>
        )}

        <a
          className="popup__link"
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Google Maps →
        </a>
      </div>
    </div>
  )
}
