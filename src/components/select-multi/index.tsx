import { memo, useEffect, useState } from "react";
import Dropdown from "../dropdown";
import { StyledSelectMultiWrapper } from "./styles";

type Props = {
  options: Set<string>;
  label: string;
  searchable?: boolean;
  onValueChange: (updatedState: Array<string>) => void;
};

type SelectedOptions = {
  [key: number]: string;
};

const SelectMulti = memo(({ options, label, searchable, onValueChange }: Props) => {
  const [unfilteredSelectedOptions, setUnfilteredSelectedOptions] =
    useState<SelectedOptions>({});
  const [filterOption, setFilterOptions] = useState([...options]);

  useEffect(() => {
    setUnfilteredSelectedOptions({})
    setFilterOptions([...options].sort());
  }, [options]);

  const isSelected = (index: number) =>
    unfilteredSelectedOptions[index] === filterOption[index];

  const filteredSelectedOptions = (rawSelectedOptions: SelectedOptions) =>
    Object.values(rawSelectedOptions).filter((value) => value !== "");

  // This could be made a hook to avoid repeatition
  const onFilterOptions = (query: string) => {
    if (query === "") {
      setFilterOptions([...options]);
    }
    const filtered = [...options].filter((option) => option.includes(query.toLowerCase()));
    setFilterOptions([...filtered]);
  };

  const handleOnChange = (index: number) => {
    let updatedSelectedOptions = { ...unfilteredSelectedOptions };

    if (
      !updatedSelectedOptions.hasOwnProperty(index) ||
      updatedSelectedOptions[index] === ""
    ) {
      updatedSelectedOptions[index] = filterOption[index];
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
    filterOption.map((option, index) => (
      <div key={index} className="option">
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
      <Dropdown label={label} className="options">
        {searchable && (
          <div className="search">
            <input
              type="text"
              placeholder="Search filters name"
              onChange={(e) => onFilterOptions(e.target.value)}
            />
          </div>
        )}
        <div>{getSelectedOptionsCountElement()}</div>
        <div className="checkboxes">{getInputElements()}</div>
      </Dropdown>
    </StyledSelectMultiWrapper>
  );
});

export default SelectMulti;
