import styled from "styled-components";

export const StyledFilterSortWrapper = styled.div`
  padding-left: 10%;
  padding-right: 10%;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 5fr 2fr 3fr;

  > {
    &:nth-child(2) {
      grid-column-start: 3;
    }
  }

  input {
    padding: 12px 20px;
    border-radius: 30px;
    outline: none;
    border: 1px solid ${props => props.theme.borderColor};
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
    justify-content: flex-end;
    > {
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
  }
`;
