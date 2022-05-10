import { SelectHTMLAttributes } from "react";
import { StyledSelect } from "./styles";

type Props = {
  defaultOption?: string;
  options: Array<string>;
  name: string
  onChange: (selectionOption: string) => void
};

const Select = ({
  defaultOption,
  options,
  name,
  onChange,
  ...props
}: Props & SelectHTMLAttributes<HTMLSelectElement>) => {
  const onChangeHandler = (value: string) => {
    onChange(value)
  }
  return (
    <StyledSelect {...props} name={name} onChange={(e) => onChangeHandler(e.target.value)}>
      {defaultOption && <option value="">{defaultOption}</option>}
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
