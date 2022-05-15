import { HTMLAttributes, ReactNode, useState } from "react";
import ButtonText from "../button-text";
import { StyledDropdownWrapper } from "./styles";

type Props = {
  children: ReactNode;
  label: string;
};

const Dropdown = ({
  children,
  label,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <StyledDropdownWrapper {...props}>
      <div className="outter">
        <ButtonText
          text={label}
          variant="outline"
          onClick={() => setExpanded((previousState) => !previousState)}
          aria-expanded={expanded}
        />
      </div>
      {expanded && (
        <div
          className="inner"
          aria-expanded={expanded}
          data-testid="inner-content"
        >
          {children}
        </div>
      )}
    </StyledDropdownWrapper>
  );
};

export default Dropdown;
