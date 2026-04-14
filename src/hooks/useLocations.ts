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

    async function fetch() {
      setLoading(true)
      setError(null)
      try {
        let query = supabase.from('locations').select('*').order('name')

        if (filters.shade === 'yes')    query = query.eq('shade', 'yes')
        if (filters.restroom === 'yes') query = query.eq('restroom', 'yes')
        if (filters.language)           query = query.contains('languages', [filters.language])

        const { data, error: dbErr } = await query
        if (cancelled) return
        if (dbErr) throw dbErr

        let result: LocationRow[] = data ?? []

        // child age
        if (filters.childAge) {
          result = result.filter(
            loc => loc.child_age.length === 0 ||
              loc.child_age.includes(filters.childAge as NonNullable<typeof filters.childAge>)
          )
        }

        // place type (normalise 'every day' etc.)
        if (filters.type) {
          result = result.filter(loc => normalisePlaceType(loc.place_type) === filters.type)
        }

        // date range — only applied when type === 'event' and at least one date is set
        // locations without an event_date are excluded when a date filter is active
        if (filters.type === 'event' && (filters.dateFrom || filters.dateTo)) {
          result = result.filter(loc => {
            // LocationRow doesn't have event_date — it's stored in place_type or comments
            // We compare against a hypothetical event_date field; if absent, exclude
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

    void fetch()
    return () => { cancelled = true }
  }, [filters, tick])

  return { locations, loading, error, refetch }
}
