import styled from "styled-components"

export const StyledButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  &.outline {
    border: 1px solid ${props => props.theme.borderColor};
    padding: 12px 32px;
    border-radius: 30px;
    color: ${props => props.theme.textLight}
  }
`;