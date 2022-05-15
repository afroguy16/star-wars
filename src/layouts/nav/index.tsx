import { HTMLAttributes } from "react";
import ToggleSwitch from "../../components/toggle-switch";
import { StyledNavWrapper } from "./styles";

type Props = {
  onToggleSwitch: () => void;
};

const Nav = ({ onToggleSwitch, ...props }: Props & HTMLAttributes<HTMLDivElement>) => {
  return (
    <StyledNavWrapper {...props}>
      <ToggleSwitch onToggleSwitch={onToggleSwitch} />
    </StyledNavWrapper>
  );
};

export default Nav;
