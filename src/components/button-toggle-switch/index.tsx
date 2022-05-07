import { Input } from "./styles";

type Props = {
  onToggleSwitch: () => void;
};

const ButtonToggleSwitch = ({ onToggleSwitch }: Props) => {
  return (
      <Input type="checkbox" onClick={onToggleSwitch} />
  );
};

export default ButtonToggleSwitch;
