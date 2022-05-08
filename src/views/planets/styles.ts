import styled from "styled-components";

export const StyledPlanetsWrapper = styled.div`
  display: flex;
  min-height: calc(100vh - 70px);
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  transition: 0.5s;

  .loading-wrapper {
    width: 100%;
    padding-top: 10em;

    @media(min-width: 768px) {
      padding-top: 20em;
    }
  }
`;