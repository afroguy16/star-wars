import { useEffect, useState } from "react";
import { StyledSelectMultiWrapper } from "./styles";

type Props = {
  options: Set<string>;
  label?: string;
  searchable?: boolean;
  onValueChange: (updatedState: Array<string>) => void;
};

type SelectedOptions = {
  [key: number]: string;
};

const SelectMulti = ({ options, label, searchable, onValueChange }: Props) => {
  const [unfilteredSelectedOptions, setUnfilteredSelectedOptions] =
    useState<SelectedOptions>({});
  const [filteredOptions, setFilteredOptions] = useState([...options]);

  useEffect(() => {
    setFilteredOptions([...options]);
  }, [options]);

  const isSelected = (index: number) =>
    unfilteredSelectedOptions[index] === filteredOptions[index];

  const filteredSelectedOptions = (rawSelectedOptions: SelectedOptions) =>
    Object.values(rawSelectedOptions).filter((value) => value !== "");

  // This could be made a hook to avoid repeatition
  const onFilterOptions = (query: string) => {
    if (query === "") {
      setFilteredOptions([...options]);
    }
    const filtered = [...options].filter((option) => option.includes(query));
    setFilteredOptions([...filtered]);
  };

  const handleOnChange = (index: number) => {
    let updatedSelectedOptions = { ...unfilteredSelectedOptions };

    if (
      !updatedSelectedOptions.hasOwnProperty(index) ||
      updatedSelectedOptions[index] === ""
    ) {
      updatedSelectedOptions[index] = filteredOptions[index];
    } else {
      updatedSelectedOptions[index] = "";
    }

    setUnfilteredSelectedOptions(updatedSelectedOptions);

    const valueToSend = filteredSelectedOptions(updatedSelectedOptions);
    onValueChange(valueToSend);
  };

  const getSelectedOptionsCountElement = () => {
    const count = filteredSelectedOptions(unfilteredSelectedOptions).length;

    if (count < 1) return <p aria-label="selected count">0 item selected</p>;
    if (count > 1)
      return <p aria-label="selected count">{count} items selected</p>;

    return <p aria-label="selected count">1 item selected</p>;
  };

  const getInputElements = () =>
    filteredOptions.map((option, index) => (
      <div key={index}>
        <input
          checked={isSelected(index)}
          key={index}
          type="checkbox"
          name={option}
          onChange={() => handleOnChange(index)}
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
