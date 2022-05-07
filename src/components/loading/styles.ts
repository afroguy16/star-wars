import styled, { keyframes } from "styled-components"

const breath = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
`

export const StyledLoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.text};

  .circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${props => props.theme.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${breath} 0.5s linear infinite alternate-reverse;

    .inner {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: white;
  }
}
`;