import { PropsWithChildren } from "react"
import styled from "styled-components"

const mediaMinWidth = (br: string, rules: string) => `@media (min-width: ${br}) { ${rules} }`

const BREAKPOINTS = {
  'mobile': '0', // default
  'tablet': '600px',
} as const

const unusedScreens = (screens: (keyof typeof BREAKPOINTS)[]) => {
  const all = Object.keys(BREAKPOINTS) as Array<keyof typeof BREAKPOINTS>
  return all.filter(s => !screens.includes(s))
}

/**
 * Util helper for displaying components on certain screens
 *
 * @note limit testing what's possible
 */
const ShowOn = styled.div<PropsWithChildren<{ screens: Array<keyof typeof BREAKPOINTS> }>>`
  /* Show on defined screens */
  ${props => props.screens.map(s => {
  if (BREAKPOINTS[s] === '0')
    return 'display: block;';
  return mediaMinWidth(BREAKPOINTS[s], 'display: block;')
}).join("\n")}

  /* Hide on everything else */
  ${props => unusedScreens(props.screens).map(s => {
  if (BREAKPOINTS[s] === '0')
    return 'display: none;';
  return mediaMinWidth(BREAKPOINTS[s], 'display: none;')
}).join("\n")}
`

export default ShowOn
