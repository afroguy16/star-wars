import styled from "styled-components";

export const StyledNavWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding-right: 20px;
  min-height: 70px;
  background-color: ${(props) => props.theme.background};
`;