import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { normalisePlaceType } from '@/types'
import type { LocationRow, Filters } from '@/types'

interface UseLocationsResult {
  locations: LocationRow[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useLocations(filters: Filters): UseLocationsResult {
  const [locations, setLocations] = useState<LocationRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const refetch = useCallback(() => setTick(t => t + 1), [])

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        let query = supabase.from('locations').select('*').order('name')

        // Mood filter — DB column: what_do_you_feel_like_doing_today
        // The column may contain multiple values separated by ';'
        // We do client-side contains check for flexibility
        const { data, error: dbErr } = await query
        if (cancelled) return
        if (dbErr) throw dbErr

        let result: LocationRow[] = data ?? []

        // mood — match if the column contains the selected mood value
        if (filters.mood) {
          result = result.filter(loc => {
            const raw = loc["what_do_you_feel_like_doing_today"]
            if (!raw) return false
            // support semicolon-separated multiple moods per location
            return raw.split(/[;|]/).map(s => s.trim()).some(
              v => v.toLowerCase() === filters.mood.toLowerCase()
            )
          })
        }

        // child age
        if (filters.childAge) {
          result = result.filter(
            loc => loc.child_age.length === 0 ||
              loc.child_age.includes(filters.childAge as NonNullable<typeof filters.childAge>)
          )
        }

        // place type
        if (filters.type) {
          result = result.filter(loc => normalisePlaceType(loc.place_type) === filters.type)
        }

        // date range
        if (filters.type === 'event' && (filters.dateFrom || filters.dateTo)) {
          result = result.filter(loc => {
            const raw = (loc as LocationRow & { event_date?: string }).event_date
            if (!raw) return false
            if (filters.dateFrom && raw < filters.dateFrom) return false
            if (filters.dateTo   && raw > filters.dateTo)   return false
            return true
          })
        }

        setLocations(result)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Error fetching locations')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void fetchData()
    return () => { cancelled = true }
  }, [filters, tick])

  return { locations, loading, error, refetch }
}
