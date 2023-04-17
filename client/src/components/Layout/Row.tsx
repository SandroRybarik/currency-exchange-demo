import styled from "styled-components";

const Row = styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem 0;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`

export default Row
