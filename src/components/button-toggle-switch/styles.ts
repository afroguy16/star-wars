import styled from "styled-components"
import sun from "../../assets/icons/sun.svg"
import moon from "../../assets/icons/moon.svg"

export const StyledInput = styled.input`
  cursor: pointer;
  position: relative;
  width: 60px;
  height: 30px;
  appearance: none;
  background-color: #151515;
  border-radius: 20px;
  transition: 0.5s;

  &:hover {
    background-color: #3a3a3a;
  }

  &:checked {
    background: #faaa15;
    
    &:hover {
      background: #fab535;
    }
  }

  &:checked::after {
    content: url(${sun});
    position: absolute;
    width: 30px;
    height: 30px;
    top: 5.25px;
    left: 7px;
    transition: 0.5s;
  }

  &:after {
    content: url(${moon});
    position: absolute;
    width: 30px;
    height: 30px;
    top: 5.25px;
    left: 33px;
    transition: 0.5s;
  }

  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 15px;
    top: 5px;
    left: 7.5px;
    box-shadow: 0 2px 5px #858585;
    transition: 0.5s;
    background: #FFFFFF;
    z-index: 1;
  }

  &:checked::before {
    left: 30px;
  }
`;