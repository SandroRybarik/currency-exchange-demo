import styled from "styled-components";

const PlainTable = styled.table`
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

export default PlainTable
