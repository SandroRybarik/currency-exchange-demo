import { PropsWithChildren } from "react";
import styled from "styled-components";

const TableRow = styled.tr<PropsWithChildren<{ highlight?: boolean }>>`
  border: ${props => props.highlight ? '2px solid #999999' : 'initial'};
`

export default TableRow
