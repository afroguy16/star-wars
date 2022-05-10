import { SelectHTMLAttributes, useState } from "react";
import { StyledSelectWrapper } from "./styles";

type Props = {
  defaultOption?: string;
  label?: string;
  options: Array<string>;
  searchable?: boolean;
  onChange: (selectionOption: string) => void;
};

const Select = ({
  defaultOption,
  label,
  options,
  searchable,
  onChange,
  ...props
}: Props & SelectHTMLAttributes<HTMLSelectElement>) => {
  const [filteredOptions, setFilteredOptions] = useState([...options]);

  const getOptionsElements = () =>
    filteredOptions.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ));

  const onChangeHandler = (value: string) => {
    onChange(value);
  };

  const onFilterOptions = (query: string) => {
    const filtered = options.filter((option) => option.includes(query));
    if (!filtered) return options;
    setFilteredOptions(filtered);
  };

  return (
    <StyledSelectWrapper>
      <div>{label && <p role="label">{label}</p>}</div>

      {searchable && (
        <div>
          <input
            type="text"
            onChange={(e) => onFilterOptions(e.target.value)}
          />
        </div>
      )}

      <select {...props} onChange={(e) => onChangeHandler(e.target.value)}>
        {defaultOption && <option value="">{defaultOption}</option>}
        {getOptionsElements()}
      </select>
    </StyledSelectWrapper>
  );
};

export default Select;
