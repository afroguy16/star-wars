import { StyledInput } from "./styles";

type Props = {
  onToggleSwitch: () => void;
};

const ToggleSwitch = ({ onToggleSwitch }: Props) => {
  return (
      <StyledInput type="checkbox" onClick={onToggleSwitch} />
  );
};

export default ToggleSwitch;
