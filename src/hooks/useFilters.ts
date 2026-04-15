import { useState, useCallback } from 'react'
import { DEFAULT_FILTERS } from '@/types'
import type { Filters, PlaceType, ChildAge, Mood } from '@/types'

interface UseFiltersResult {
  filters: Filters
  pendingFilters: Filters
  activeCount: number
  setMood: (mood: Mood) => void
  setChildAge: (age: ChildAge | '') => void
  setType: (type: PlaceType) => void
  setDateFrom: (d: string) => void
  setDateTo: (d: string) => void
  apply: () => void
  reset: () => void
}

function countActive(f: Filters): number {
  let n = 0
  if (f.mood)               n++
  if (f.childAge)           n++
  if (f.type)               n++
  if (f.dateFrom || f.dateTo) n++
  return n
}

export function useFilters(): UseFiltersResult {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [pendingFilters, setPendingFilters] = useState<Filters>(DEFAULT_FILTERS)

  const setMood = useCallback((mood: Mood) => {
    setPendingFilters(f => ({ ...f, mood }))
  }, [])

  const setChildAge = useCallback((childAge: ChildAge | '') => {
    setPendingFilters(f => ({ ...f, childAge }))
  }, [])

  const setType = useCallback((type: PlaceType) => {
    setPendingFilters(f => ({
      ...f, type,
      dateFrom: type !== 'event' ? '' : f.dateFrom,
      dateTo: type !== 'event' ? '' : f.dateTo,
    }))
  }, [])

  const setDateFrom = useCallback((dateFrom: string) => {
    setPendingFilters(f => ({ ...f, dateFrom }))
  }, [])

  const setDateTo = useCallback((dateTo: string) => {
    setPendingFilters(f => ({ ...f, dateTo }))
  }, [])

  const apply = useCallback(() => setFilters(pendingFilters), [pendingFilters])

  const reset = useCallback(() => {
    setPendingFilters(DEFAULT_FILTERS)
    setFilters(DEFAULT_FILTERS)
  }, [])

  return {
    filters, pendingFilters,
    activeCount: countActive(filters),
    setMood, setChildAge, setType, setDateFrom, setDateTo,
    apply, reset,
  }
}
