import styled from "styled-components";

const FullScreenOverlay = styled.div`
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

const CenteredAlert = ({ title, message }: { title: string, message?: string }) => {
  return <FullScreenOverlay>
    <div>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
    </div>
  </FullScreenOverlay>
}

export default CenteredAlert
