import { HTMLAttributes, memo, useEffect, useState } from "react";
import Button from "../button";
import Dropdown from "../dropdown";
import { StyledSelectWrapper } from "./styles";

type Props = {
  defaultOption?: string;
  label: string;
  options: Set<string>;
  searchable?: boolean;
  searchableLabel?: string;
  onChange: (selectionOption: string) => void;
};

const Select = memo(({
  defaultOption,
  label,
  options,
  searchable,
  searchableLabel,
  onChange,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) => {
  const [filteredOptions, setFilteredOptions] = useState([...options]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);

  // This could be made a hook to avoid repeatition
  const onFilterOptions = (query: string) => {
    if (query === "") {
      setFilteredOptions([...options]);
    }
    const filtered = [...options].filter((option) => option.includes(query));
    setFilteredOptions([...filtered]);
  };

  const getOptionsElements = () =>
    filteredOptions.map((option, index) => (
      <li
        key={index}
        role="option"
        className={isSelected(index) ? 'active' : ''}
        aria-selected={isSelected(index)}
        onClick={() => onChangeHandler(index)}
      >
        <Button text={option} />
      </li>
    ));

  const isSelected = (index: number) => index === selectedOptionIndex;

  const defaultOptionIsSelected = () => selectedOptionIndex === -1;

  const onChangeHandler = (index: number) => {
    const value = filteredOptions[index];

    setSelectedOptionIndex(index);
    onChange(value);
  };

  const resetSelectedOption = () => {
    setSelectedOptionIndex(-1);
    onChange("");
  };

  return (
    <StyledSelectWrapper {...props}>
      <Dropdown label={label}>
        {searchable && (
          <div className="search">
            <input
              type="text"
              onChange={(e) => onFilterOptions(e.target.value)}
              placeholder={searchableLabel ? searchableLabel : 'Search items'}
            />
          </div>
        )}

        <ul className="options">
          {defaultOption && (
            <li
              role="option"
              aria-selected={defaultOptionIsSelected()}
              onClick={resetSelectedOption}
            >
              <Button text={defaultOption} />
            </li>
          )}
          {getOptionsElements()}
        </ul>
      </Dropdown>
    </StyledSelectWrapper>
  );
});

export default Select;
