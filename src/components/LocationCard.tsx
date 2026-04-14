import { useState } from 'react'
import type { LocationRow } from '@/types'
import { parsePhotos, ageLabel, LANGUAGE_OPTIONS, normalisePlaceType } from '@/types'
import { parseActivities } from '@/lib/activityTypes'
import type { Translations } from '@/i18n'

interface LocationCardProps {
  location: LocationRow
  t: Translations
  onClose: () => void
}

export function LocationCard({ location, t, onClose }: LocationCardProps) {
  const photos = parsePhotos(location.photo)
  const [photoIndex, setPhotoIndex] = useState(0)
  const activities = parseActivities(location.activity_type)
  const type = normalisePlaceType(location.place_type)

  const googleUrl = location.google_maps_link?.startsWith('http')
    ? location.google_maps_link
    : `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`

  const langLabel = (code: string) => LANGUAGE_OPTIONS.find(l => l.value === code)

  function prev() { setPhotoIndex(i => (i - 1 + photos.length) % photos.length) }
  function next() { setPhotoIndex(i => (i + 1) % photos.length) }

  return (
    <div className="card-overlay" onClick={onClose}>
      <div className="location-card" onClick={e => e.stopPropagation()}>

        {/* ── Photo gallery ── */}
        {photos.length > 0 ? (
          <div className="card-gallery">
            <img
              key={photoIndex}
              src={photos[photoIndex]}
              alt={`${location.name} – photo ${photoIndex + 1}`}
              className="card-gallery__img"
            />

            {/* Prev / Next arrows */}
            {photos.length > 1 && (
              <>
                <button className="card-gallery__arrow card-gallery__arrow--prev" onClick={prev} aria-label="Previous">‹</button>
                <button className="card-gallery__arrow card-gallery__arrow--next" onClick={next} aria-label="Next">›</button>
              </>
            )}

            {/* Dot indicators */}
            {photos.length > 1 && (
              <div className="card-gallery__dots">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    className={`card-gallery__dot${i === photoIndex ? ' card-gallery__dot--active' : ''}`}
                    onClick={() => setPhotoIndex(i)}
                    aria-label={`Photo ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Counter badge */}
            {photos.length > 1 && (
              <div className="card-gallery__counter">{photoIndex + 1} / {photos.length}</div>
            )}

            {/* Close button overlaid on gallery */}
            <button className="card-close card-close--overlay" onClick={onClose} aria-label="Close">✕</button>
          </div>
        ) : (
          /* No photo — close button in header */
          <div className="card-no-photo">
            <div className="card-no-photo__icon">{activities[0].emoji}</div>
            <button className="card-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
        )}

        {/* ── Header ── */}
        <div className="card-header">
          <div className="card-activity-pills">
            {activities.map(a => (
              <span key={a.key} className="card-pill" style={{ background: a.color }}>
                {a.emoji}
              </span>
            ))}
            {type && (
              <span className="card-pill card-pill--type">
                {type === 'everyday' ? t.placeTypeEveryday : t.placeTypeEvent}
              </span>
            )}
          </div>
          <h2 className="card-name">{location.name}</h2>
        </div>

        {/* ── Body ── */}
        <div className="card-body">

          {/* Comments / description */}
          {location.comments && (
            <div className="card-section">
              <div className="card-section-title">{t.comments}</div>
              <p className="card-desc">{location.comments}</p>
            </div>
          )}

          {/* Amenities */}
          <div className="card-amenities">
            {location.child_age.length > 0 && (
              <div className="card-amenity">
                <span>👶</span>
                <span>{location.child_age.map(a => ageLabel(a, t)).join(', ')}</span>
              </div>
            )}
            {location.shade === 'yes' && (
              <div className="card-amenity"><span>🌿</span><span>{t.shade}</span></div>
            )}
            {location.restroom === 'yes' && (
              <div className="card-amenity"><span>🚻</span><span>{t.wc}</span></div>
            )}
          </div>

          {/* Languages */}
          {location.languages.length > 0 && (
            <div className="card-tags">
              {location.languages.map(code => {
                const lang = langLabel(code)
                return (
                  <span key={code} className="card-tag">
                    {lang ? `${lang.flag} ${lang.label}` : code}
                  </span>
                )
              })}
            </div>
          )}

          {/* Thumbnail strip for multiple photos */}
          {photos.length > 1 && (
            <div className="card-thumb-strip">
              {photos.map((url, i) => (
                <button
                  key={i}
                  className={`card-thumb${i === photoIndex ? ' card-thumb--active' : ''}`}
                  onClick={() => setPhotoIndex(i)}
                >
                  <img src={url} alt={`thumb ${i + 1}`} />
                </button>
              ))}
            </div>
          )}

          {/* Google Maps link */}
          <a className="card-maps-link" href={googleUrl} target="_blank" rel="noopener noreferrer">
            {t.openInMaps}
          </a>
        </div>

      </div>
    </div>
  )
}
