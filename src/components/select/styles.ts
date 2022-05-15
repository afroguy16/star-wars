import styled from "styled-components";

export const StyledSelectWrapper = styled.div`
  .search {
    width: 100%;
  }

  .options {
    max-height: 200px;
    overflow: auto;
    list-style-type: none;
    padding: 0;
    color: ${props => props.theme.textLight};

    /* width */
    ::-webkit-scrollbar {
      width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: gray;
      border-radius: 10px;
    }
  }

  li {
    margin-bottom: 12px;
    font-weight: 400;
    cursor: pointer;
    input {
      margin-right: 12px;
      cursor: pointer;
    }
    label {
      cursor: pointer;
    }
    &:last-child {
      margin-bottom: 0;
    }
    button {
      text-transform: capitalize;
    }
    &:hover, &.active {
      color: ${props => props.theme.primary};
    }
  }
`;
