import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export const Heading = styled.h1`
  font-size: 1.6rem;
  color: #333333;
  text-align: center;
  @media (min-width: 600px) {
    font-size: 3rem;
  }
`

export const NumberInput = styled.input`
  display: block;
  padding: 0.25rem;
  font-size: 1.2rem;
  border: none;
  width: 100%;
`

export const InputLabel = styled.label`
  display: flex;
  align-items: center;
  height: auto;
  background: #f1f1f1;
  padding: 0 0.5rem;
`

export const InputGroup = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid #dedede;
`

export const Pick = styled.select`
  border: none;
  padding: 0.25rem;
  font-size: 1.2rem;
  width: 100%;
`

export const Row = styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem 0;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`

export const Container = styled.div`
  padding: 1rem;
  margin: 0 auto;
  max-width: 100%;
  @media (min-width: 600px) {
    max-width: 600px;
  }
`

export const ExchangeResult = styled.div`
  padding: 2rem 0rem;
  text-align: center;
  font-size: 1.5rem;
`

export const PlainTable = styled.table`
  font-size: 0.60rem;

  @media (min-width: 600px) {
    font-size: 1rem;
  }
  margin-top: 2rem;
  border-collapse: collapse;
  width: 100%;

  th, td {
    border: 1px solid #dedede;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f1f1f1;
    font-weight: bold;
  }
`

export const TableRow = styled.tr<PropsWithChildren<{ highlight?: boolean }>>`
  border: ${props => props.highlight ? '2px solid #999999' : 'initial'};
`

export const FullScreenOverlay = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  div {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  p {
    font-size: 1.0rem;
  }

  h3 {
    font-size: 1.5rem;
  }
`

export const CenteredAlert = ({title, message}: { title: string, message?: string }) => {
  return <FullScreenOverlay>
    <div>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
    </div>
  </FullScreenOverlay>
}

export const mediaMinWidth = (br: string, rules: string) => `@media (min-width: ${br}) { ${rules} }`

const BREAKPOINTS = {
  'mobile': '0', // default
  'tablet': '600px',
} as const

export const unusedScreens = (screens: (keyof typeof BREAKPOINTS)[]) => {
  const all = Object.keys(BREAKPOINTS) as Array<keyof typeof BREAKPOINTS>
  return all.filter(s => !screens.includes(s))
}

/**
 * Util helper for displaying components on certain screens
 * 
 * @note limit testing what's possible
 */
export const ShowOn = styled.div<PropsWithChildren<{ screens: Array<keyof typeof BREAKPOINTS> }>>`
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
