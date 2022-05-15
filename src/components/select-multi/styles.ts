import styled from "styled-components";

export const StyledSelectMultiWrapper = styled.div`
  .search {
      width: 100%;
    }

  .checkboxes {
    max-height: 200px;
    overflow: auto;

    
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

  .options {
    color: ${props => props.theme.textLight}
  }

  .option {
    margin-bottom: 12px;
    font-weight: 400;
    text-transform: capitalize;
    cursor: pointer;
    input {
      margin-right: 12px;
      cursor: pointer;
      &[type=checkbox] {
        accent-color: ${props => props.theme.primary};
      }
    }
    label {
      cursor: pointer;
    }
    &:hover {
      color: ${props => props.theme.primary};
    }
  }
`;
