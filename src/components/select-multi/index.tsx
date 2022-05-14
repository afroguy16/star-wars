import { useEffect, useState } from "react";
import { StyledSelectMultiWrapper } from "./styles";

type Props = {
  options: Set<string>;
  label?: string;
  searchable?: boolean;
  onValueChange: (updatedState: Array<string>) => void;
};

const SelectMulti = ({ options, label, searchable, onValueChange }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<Array<string>>([]);
  const [filteredOptions, setFilteredOptions] = useState([...options]);

  useEffect(() => {
    setFilteredOptions([...options]);
  }, [options]);

  // This could be made a hook to avoid repeatition
  const onFilterOptions = (query: string) => {
    if (query === "") {
      setFilteredOptions([...options]);
    }
    const filtered = [...options].filter((option) => option.includes(query));
    setFilteredOptions([...filtered]);
  };

  const handleOnChange = (value: string) => {
    let updatedSelectedOptions = [...selectedOptions];
    const valueIndex = updatedSelectedOptions.findIndex(
      (options) => options === value
    );

    if (valueIndex >= 0) {
      updatedSelectedOptions.splice(valueIndex, 1);
    } else {
      updatedSelectedOptions.push(value);
    }

    setSelectedOptions(updatedSelectedOptions);
    onValueChange(updatedSelectedOptions);
  };

  const getSelectedOptionsCountElement = () => {
    const count = selectedOptions.length;

    if (count < 1) return <p aria-label="selected count">0 item selected</p>;
    if (count > 1)
      return <p aria-label="selected count">{count} items selected</p>;

    return <p aria-label="selected count">1 item selected</p>;
  };

  const getInputElements = () =>
    filteredOptions.map((option, index) => (
      <div key={index}>
        <input
          key={index}
          type="checkbox"
          name={option}
          onChange={(e) => handleOnChange(e.target.name)}
          id={option}
        />
        <label htmlFor={option}>{option}</label>
      </div>
    ));

  return (
    <StyledSelectMultiWrapper>
      {!!label && (
        <div>
          <p>{label}</p>
        </div>
      )}
      {searchable && (
        <div>
          <input
            type="text"
            onChange={(e) => onFilterOptions(e.target.value)}
          />
        </div>
      )}
      <div>{getSelectedOptionsCountElement()}</div>
      <div>{getInputElements()}</div>
    </StyledSelectMultiWrapper>
  );
};

export default SelectMulti;
