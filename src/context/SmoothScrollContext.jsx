import {
  Children,
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { ScrollSmoother } from '../gsap/registerGSAP'

const SmoothScrollContext = createContext({
  smoother: null,
  scrollToAnchor: () => {},
})

export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

const HEADER_OFFSET_PX = 96

/**
 * Primer hijo se renderiza FUERA de #smooth-content (p. ej. Encabezado fixed).
 * ScrollSmoother aplica transform a #smooth-content; el fixed dentro rompe el anclaje al viewport.
 */
export function SmoothScrollProvider({ children }) {
  const [smoother, setSmoother] = useState(null)
  const childList = Children.toArray(children)
  const chrome = childList.length > 1 ? childList[0] : null
  const page = childList.length > 1 ? childList.slice(1) : childList

  useLayoutEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      setSmoother(null)
      return undefined
    }

    const instance = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.15,
      smoothTouch: 0.1,
      effects: false,
    })

    setSmoother(instance)

    return () => {
      instance.kill()
      setSmoother(null)
    }
  }, [])

  const scrollToAnchor = useMemo(
    () => (href, instant = false) => {
      const id = href.replace(/^#/, '')
      const el = document.getElementById(id)
      if (!el) return

      const active = ScrollSmoother.get()
      const pos = `top ${HEADER_OFFSET_PX}px`

      if (active) {
        active.scrollTo(el, !instant, pos)
        return
      }

      const top =
        el.getBoundingClientRect().top +
        window.scrollY -
        HEADER_OFFSET_PX
      window.scrollTo({
        top: Math.max(0, top),
        behavior: instant ? 'auto' : 'smooth',
      })
    },
    []
  )

  const value = useMemo(
    () => ({ smoother, scrollToAnchor }),
    [smoother, scrollToAnchor]
  )

  return (
    <SmoothScrollContext.Provider value={value}>
      <div id="smooth-wrapper">
        {chrome}
        <div id="smooth-content">{page}</div>
      </div>
    </SmoothScrollContext.Provider>
  )
}
