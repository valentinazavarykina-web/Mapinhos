import { useState, useCallback } from 'react'
import { translations } from '@/i18n'
import type { Locale, Translations } from '@/i18n'

const STORAGE_KEY = 'mapinhos_locale'

function getInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'ru' || stored === 'pt') return stored
  } catch { /* ignore */ }
  return 'en'
}

interface UseLocaleResult {
  locale: Locale
  t: Translations
  setLocale: (l: Locale) => void
}

export function useLocale(): UseLocaleResult {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try { localStorage.setItem(STORAGE_KEY, l) } catch { /* ignore */ }
  }, [])

  return { locale, t: translations[locale], setLocale }
}
