import styled from "styled-components";
import { breakPoints } from "../../themes/variables";

export const StyledPlanetsWrapper = styled.div`
  background-color: ${(props) => props.theme.background};
  padding-bottom: 64px;
  transition: 0.5s;
  
  .sort-filter-search {
    margin-bottom: 32px;
    padding-top: 20px;
  }

  .planet-list-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    min-height: calc(100vh - 250px);
  }

  .no-result {
    color: ${props => props.theme.text};
  }

  .planet-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    color: ${(props) => props.theme.text};
    padding: 0;
    margin: 0;
    margin-bottom: 32px;
    list-style-type: none;
    transition: 0.5s;
    > * {
      width: 400px;
      margin-bottom: 20px;

      @media (min-width: ${breakPoints.small}) {
        width: 521px;
        &:nth-child(odd) {
          margin-right: 20px;
        }
      }
    }

    @media (min-width: ${breakPoints.small}) {
      padding: 0 15%;
      padding-top: 20px;
    }
  }
`;
