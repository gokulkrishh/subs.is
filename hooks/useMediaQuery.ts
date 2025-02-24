import { useEffect, useState } from 'react'

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)
    mediaQuery.addEventListener('change', handler)
    setMatches(mediaQuery.matches)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}
