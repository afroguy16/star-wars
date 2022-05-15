import { HTMLAttributes } from "react";
import ToggleSwitch from "../../components/toggle-switch";
import { StyledTopBarWrapper } from "./styles";

type Props = {
  onToggleSwitch: () => void;
};

const TopBar = ({ onToggleSwitch, ...props }: Props & HTMLAttributes<HTMLDivElement>) => {
  return (
    <StyledTopBarWrapper {...props}>
      <ToggleSwitch onToggleSwitch={onToggleSwitch} />
    </StyledTopBarWrapper>
  );
};

export default TopBar;
