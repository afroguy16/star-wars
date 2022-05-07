import styled, { keyframes } from "styled-components"

const breath = keyframes`
  from {
    opacity: 0.75;
  }
  to {
    opacity: 1;
  }
`

export const StyledLoadingParagraph = styled.p`
  text-align: center;
  animation: ${breath} 0.75s ease-in infinite alternate-reverse;
`;