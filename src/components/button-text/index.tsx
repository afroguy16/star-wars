import { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./styles";

type Props = {
  text: string;
};

const ButtonText = ({
  text,
  ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <StyledButton {...props}>{text}</StyledButton>;
};

export default ButtonText;
