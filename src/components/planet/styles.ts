import styled from "styled-components";
import { breakPoints } from "../../themes/variables";

export const StyledPlanetWrapper = styled.div`
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 32px 48px;
  padding-bottom: 0;
  border-radius: 12px;
  height: 340px;
  position: relative;

  p {
    margin: 0; //p reset should be done globally
  }

  .climate,
  .terrain {
    display: flex;
    flex-direction: row;
    margin-bottom: 64px;
    padding: 0;
    list-style-type: none;
    text-transform: capitalize;
    font-size: 12px;
  }

  .climate {
    flex-wrap: wrap;
    li {
      border: 1px solid ${(props) => props.theme.borderColor};
      padding: 6px 16px;
      border-radius: 4px;
      &:not(:last-child) {
        margin-right: 12px;
      }
    }
  }

  .name {
    color: ${(props) => props.theme.primary};
    text-transform: uppercase;
    font-size: 31.25px;
    font-weight: 600;
    margin-bottom: 24px;
  }

  .people-count {
    display: flex;
    flex-wrap: wrap;
    text-transform: capitalize;
    margin-bottom: 48px;
    @media (min-width: ${breakPoints.small}) {
      margin-bottom: 96px;
    }
    > * {
      &:first-child {
        margin-right: 48px;
        margin-bottom: 20px;
      }
    }
    .count {
      font-size: 20px;
      margin-bottom: 4px;
    }
    .label {
      font-size: 12.8px;
    }
  }

  .terrain {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 48px;
    li {
      &:not(:last-child) {
        margin-right: 16px;
      }
    }
  }

  .decoration {
    height: 8px;
    width: 100%;
    background-color: ${(props) => props.theme.primary};
    position: absolute;
    left: 0;
    bottom: 0;
  }
`;
