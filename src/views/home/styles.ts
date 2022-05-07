import styled from "styled-components";

export const StyledHomeWrapper = styled.div`
  display: flex;
  min-height: calc(100vh - 70px);
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
`;