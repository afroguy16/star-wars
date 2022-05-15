import styled from "styled-components";
import { breakPoints } from "../../themes/variables";

export const StyledNavWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding-right: 20px;
  min-height: 40px;
  background-color: ${(props) => props.theme.background};
  transition: 0.5s;

  @media(min-width: ${breakPoints.small}) {
    min-height: 70px;
  }
`;