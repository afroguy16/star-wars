import { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./styles";

type Props = {
  text: string;
  variant?: string;
};

const ButtonText = ({
  text,
  variant,
  ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <StyledButton className={variant} {...props}>{text}</StyledButton>;
};

export default ButtonText;
