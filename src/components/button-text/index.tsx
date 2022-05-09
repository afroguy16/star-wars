import { StyledButton } from "./styles";

type Props = {
  text: string
  disabled?: boolean
  onClick?: () => void
};

const ButtonText = ({ text, disabled, onClick }: Props) => {
  return (
      <StyledButton onClick={onClick} disabled={disabled}>{text}</StyledButton>
  );
};

export default ButtonText;
