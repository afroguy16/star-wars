import { HTMLAttributes } from "react";
import ButtonToggleSwitch from "../../components/button-toggle-switch";
import { StyledNavWrapper } from "./styles";

type Props = {
  onToggleSwitch: () => void;
};

const Nav = ({ onToggleSwitch, ...props }: Props & HTMLAttributes<HTMLDivElement>) => {
  return (
    <StyledNavWrapper {...props}>
      <ButtonToggleSwitch onToggleSwitch={onToggleSwitch} />
    </StyledNavWrapper>
  );
};

export default Nav;
