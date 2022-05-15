import styled from "styled-components";
import { breakPoints, colors } from "../../themes/variables";

export const StyledPaginationControlsWrapper = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;

  > *,
  .pagination-list-item > * {
    &:not(:last-child) {
      margin-right: 7px;

      @media (min-width: ${breakPoints.small}) {
        margin-right: 20px;
      }
    }
  }

  > button {
    height: 30px;
    width: 30px;

    &:disabled {
      color: ${props => props.theme.disabled};
      border-color: ${props => props.theme.disabled};

      &:hover {
        background-color: transparent;
        color: ${props => props.theme.disabled};
        border-color: ${props => props.theme.disabled};
        cursor: default;
      }
    }
  }

  > button,
  li {
    border: 1px solid ${(props) => props.theme.primary};
    color: ${(props) => props.theme.text};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.lightPrimary};
      color: ${colors.lightGray};
    }

    &.active {
      background-color: ${(props) => props.theme.lightPrimary};
      color: ${colors.lightGray};
    }
  }

  .pagination-list-item {
    margin-top: 0;
    padding: 0;
    list-style-type: none;
    display: flex;

    li {
      height: 28px;
      width: 28px;
    }
  }
`;
