import { useState, useCallback } from 'react'
import { DEFAULT_FILTERS } from '@/types'
import type { Filters, PlaceType, ToggleValue, Language, ChildAge } from '@/types'

interface UseFiltersResult {
  filters: Filters
  pendingFilters: Filters
  activeCount: number
  setChildAge: (age: ChildAge | '') => void
  setType: (type: PlaceType) => void
  setDateFrom: (d: string) => void
  setDateTo: (d: string) => void
  setShade: (val: ToggleValue) => void
  setRestroom: (val: ToggleValue) => void
  setLanguage: (lang: Language) => void
  apply: () => void
  reset: () => void
}

function countActive(f: Filters): number {
  let n = 0
  if (f.childAge)           n++
  if (f.type)               n++
  if (f.dateFrom || f.dateTo) n++
  if (f.shade === 'yes')    n++
  if (f.restroom === 'yes') n++
  if (f.language)           n++
  return n
}

export function useFilters(): UseFiltersResult {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [pendingFilters, setPendingFilters] = useState<Filters>(DEFAULT_FILTERS)

  const setChildAge = useCallback((childAge: ChildAge | '') => {
    setPendingFilters(f => ({ ...f, childAge }))
  }, [])

  const setType = useCallback((type: PlaceType) => {
    setPendingFilters(f => ({
      ...f, type,
      // clear dates when switching away from event
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

  const setShade = useCallback((shade: ToggleValue) => {
    setPendingFilters(f => ({ ...f, shade }))
  }, [])

  const setRestroom = useCallback((restroom: ToggleValue) => {
    setPendingFilters(f => ({ ...f, restroom }))
  }, [])

  const setLanguage = useCallback((language: Language) => {
    setPendingFilters(f => ({ ...f, language }))
  }, [])

  const apply = useCallback(() => setFilters(pendingFilters), [pendingFilters])

  const reset = useCallback(() => {
    setPendingFilters(DEFAULT_FILTERS)
    setFilters(DEFAULT_FILTERS)
  }, [])

  return {
    filters, pendingFilters,
    activeCount: countActive(filters),
    setChildAge, setType, setDateFrom, setDateTo,
    setShade, setRestroom, setLanguage,
    apply, reset,
  }
}
