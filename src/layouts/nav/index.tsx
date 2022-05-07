import ButtonToggleSwitch from "../../components/button-toggle-switch";
import { StyledNavWrapper } from "./styles";

type Props = {
  onToggleSwitch: () => void;
};

const Nav = ({ onToggleSwitch }: Props) => {
  return (
    <StyledNavWrapper>
      <ButtonToggleSwitch onToggleSwitch={onToggleSwitch} />
    </StyledNavWrapper>
  );
};

export default Nav;
