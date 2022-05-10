import { SelectHTMLAttributes } from "react";
import { StyledSelectWrapper } from "./styles";

type Props = {
  defaultOption?: string
  label?: string
  options: Array<string>
  name: string
  onChange: (selectionOption: string) => void
};

const Select = ({
  defaultOption,
  label,
  options,
  name,
  onChange,
  ...props
}: Props & SelectHTMLAttributes<HTMLSelectElement>) => {
  const onChangeHandler = (value: string) => {
    onChange(value)
  }
  return (
    <StyledSelectWrapper>
      {label && <p role="label">{label}</p>}
      <select {...props} name={name} onChange={(e) => onChangeHandler(e.target.value)}>
        {defaultOption && <option value="">{defaultOption}</option>}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </StyledSelectWrapper>
  );
};

export default Select;
