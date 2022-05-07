import { StyledInput } from "./styles";

type Props = {
  onToggleSwitch: () => void;
};

const ButtonToggleSwitch = ({ onToggleSwitch }: Props) => {
  return (
      <StyledInput type="checkbox" onClick={onToggleSwitch} />
  );
};

export default ButtonToggleSwitch;
