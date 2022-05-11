import { useState } from "react";
import { StyledSelectMultiWrapper } from "./styles";

type Props = {
  options: Set<string>;
  label?: string;
  onValueChange: (updatedState: Set<string>) => void;
};

const SelectMulti = ({ options, label, onValueChange }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set()
  );

  const handleOnChange = (value: string) => {
    const updatedSelectedOptions = new Set(selectedOptions);
    const hasValue = updatedSelectedOptions.has(value);
    if (hasValue) {
      updatedSelectedOptions.delete(value);
    } else {
      updatedSelectedOptions.add(value);
    }
    setSelectedOptions(updatedSelectedOptions);
    onValueChange(updatedSelectedOptions);
  };

  const getSelectedOptionsCountElement = () => {
    const count = selectedOptions.size;
    if (count < 1) return <p aria-label="selected count">0 item selected</p>;
    if (count > 1)
      return <p aria-label="selected count">{count} items selected</p>;
    return <p aria-label="selected count">1 item selected</p>;
  };

  const getInputElements = () =>
    [...options].map((option, index) => (
      <input
        key={index}
        type="checkbox"
        name={option}
        onChange={(e) => handleOnChange(e.target.name)}
      />
    ));

  return (
    <StyledSelectMultiWrapper>
      {!!label && (
        <div>
          <p>{label}</p>
        </div>
      )}
      <div>{getSelectedOptionsCountElement()}</div>
      <div>{getInputElements()}</div>
    </StyledSelectMultiWrapper>
  );
};

export default SelectMulti;
