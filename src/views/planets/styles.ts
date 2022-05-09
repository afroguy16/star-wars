import styled from "styled-components";
import { breakPoints } from "../../themes/variables";

export const StyledPlanetsWrapper = styled.div`
  background-color: ${(props) => props.theme.background};
  .planet-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    min-height: calc(100vh - 70px);
    color: ${(props) => props.theme.text};
    transition: 0.5s;
    padding: 0;
    margin: 0;
    list-style-type: none;
    > * {
      width: 400px;
      margin-bottom: 20px;

      @media (min-width: ${breakPoints.medium}) {
        width: 521px;
        &:nth-child(odd) {
          margin-right: 20px;
        }
      }
    }

    @media (min-width: ${breakPoints.medium}) {
      padding: 0 15%;
      padding-top: 20px;
    }
  }
`;
