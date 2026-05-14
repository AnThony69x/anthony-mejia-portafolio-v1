/**
 * GSAP core + ScrollTrigger + ScrollSmoother.
 * ScrollSmoother está sujeto a la licencia estándar de GSAP (Club GSAP para ciertos usos comerciales).
 * https://gsap.com/licensing/
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export { gsap, ScrollTrigger, ScrollSmoother }
