import { useState } from "react";
import { StyledSelectMultiWrapper } from "./styles";

type Props = {
  options: Set<string>;
  label?: string;
  onValueChange: (updatedState: Array<string>) => void;
};

const SelectMulti = ({ options, label, onValueChange }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<Array<string>>([]);

  const handleOnChange = (value: string) => {
    let updatedSelectedOptions = [...selectedOptions];
    const valueIndex = updatedSelectedOptions.findIndex(options => options === value);
    
    if (valueIndex >= 0) {
      updatedSelectedOptions.splice(valueIndex, 1);
    } else {
      updatedSelectedOptions.push(value);
    }

    setSelectedOptions(updatedSelectedOptions);
    onValueChange(updatedSelectedOptions);
  };

  const getSelectedOptionsCountElement = () => {
    const count = selectedOptions.length
    
    if (count < 1) return <p aria-label="selected count">0 item selected</p>
    if (count > 1) return <p aria-label="selected count">{count} items selected</p>
    
    return <p aria-label="selected count">1 item selected</p>
  }

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
