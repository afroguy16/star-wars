import styled from "styled-components"

export const StyledDropdownWrapper = styled.div`
  z-index: 1;
  position: relative;
  
  .outter {
    margin-bottom: 12px;
  }
  
  .inner {
    background-color: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.borderColor};
    position: absolute;
    max-height: 350px;
    padding: 20px;
    border-radius: 12px;
    width: 240px;
  }
`;