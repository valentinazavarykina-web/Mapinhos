import { useRef, useEffect } from 'react'
import L from 'leaflet'
import type { LocationRow } from '@/types'
import { parseActivities, buildPinHtml } from '@/lib/activityTypes'
// import 'leaflet/dist/leaflet.css'

interface MapViewProps {
  locations: LocationRow[]
  loading: boolean
  onSelect: (location: LocationRow) => void
}

const MAP_CENTER: L.LatLngExpression = [38.72, -9.30]
const DEFAULT_ZOOM = 12

export function MapView({ locations, loading, onSelect }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return
    mapRef.current = L.map(containerRef.current, { zoomControl: false }).setView(MAP_CENTER, DEFAULT_ZOOM)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> © <a href="https://carto.com">CARTO</a>',
      maxZoom: 19,
    }).addTo(mapRef.current)
    L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current)
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    locations.forEach(loc => {
      const activities = parseActivities(loc.activity_type)
      const icon = L.divIcon({
        className: '',
        html: buildPinHtml(activities),
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -42],
      })

      const marker = L.marker([loc.latitude, loc.longitude], { icon }).addTo(map)
      marker.on('click', () => onSelect(loc))
      markersRef.current.push(marker)
    })
  }, [locations, onSelect])

  return (
    <div className="map-container">
      <div ref={containerRef} className="map" />
      {loading && (
        <div className="map-overlay">
          <div className="map-spinner" />
        </div>
      )}
    </div>
  )
}
