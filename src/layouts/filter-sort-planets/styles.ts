import styled from "styled-components";
import { breakPoints } from "../../themes/variables";

export const StyledFilterSortWrapper = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakPoints.small}) {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 7fr 4fr;
  }

  @media (min-width: ${breakPoints.medium}) {
    padding-left: 20%;
    padding-right: 20%;
  }

  > {
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }

  input {
    padding: 12px 20px;
    border-radius: 30px;
    outline: none;
    border: 1px solid ${(props) => props.theme.borderColor};
    color: ${props => props.theme.text};
    background: none;
    &::placeholder {
      font-size: 16px;
    }
  }

  .search {
    width: 100%;
    input {
      width: 100%;
      position: relative;
      box-sizing: border-box;
    }
  }

  .sort-filter {
    display: flex;
    justify-content: space-between;
    @media (min-width: ${breakPoints.small}) {
      justify-content: flex-end;
      > {
        &:not(:last-child) {
          margin-right: 10px;
        }
      }
    }
    @media (min-width: ${breakPoints.medium}) {
      justify-content: flex-end;
      > {
        &:not(:last-child) {
          margin-right: 20px;
        }
      }
    }
  }
`;
