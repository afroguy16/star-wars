import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectMulti from ".";

const FAKE_OPTIONS = new Set(['option 1', 'option 2', 'option 3'])
const FAKE_LABEL = "Select an option"

describe("SelectMulti with no label", () => {
  let mockOnValueChange: jest.Mock<any, any>;

  afterEach(cleanup);

  beforeEach(() => {
    mockOnValueChange = jest.fn()

    render(<SelectMulti onValueChange={(e) => mockOnValueChange(e)} options={FAKE_OPTIONS} />)
  });

  it("should render a list of checkboxes based on options passed as props", () => {
    const optionElements = screen.getAllByRole('checkbox')
    const firstOptionElement = optionElements[0]
    const secondOptionElement = optionElements[1]
    const thirdOptionElement = optionElements[2]
    
    expect(optionElements).toHaveLength(FAKE_OPTIONS.size)
    expect(firstOptionElement).toHaveAttribute('name', [...FAKE_OPTIONS][0])
    expect(secondOptionElement).toHaveAttribute('name', [...FAKE_OPTIONS][1])
    expect(thirdOptionElement).toHaveAttribute('name', [...FAKE_OPTIONS][2])
  });

  it("should call onValueCange callback with the current a snapshot of the current state of the options selected", () => {
    const optionElements = screen.getAllByRole('checkbox')
    const firstOptionElement = optionElements[0]
    const secondOptionElement = optionElements[1]
    const fakeOptions = [...FAKE_OPTIONS] //convert set to array so it's index can be used easily

    const selectedValue = new Set([fakeOptions[0]])

    userEvent.click(firstOptionElement) //select first item
    expect(mockOnValueChange).toHaveBeenLastCalledWith(selectedValue)

    userEvent.click(secondOptionElement)  //select second item
    selectedValue.add(fakeOptions[1])
    expect(mockOnValueChange).toHaveBeenCalledWith(selectedValue)

    userEvent.click(secondOptionElement) //deselect second item
    selectedValue.delete(fakeOptions[1])
    expect(mockOnValueChange).toHaveBeenLastCalledWith(selectedValue)
  });

  it(`should render items selected helper message based on the number of items selected`, () => {
    const zeroItemSelected = '0 item selected'
    const oneItemSelected = '1 item selected'
    const twoItemsSelected = '2 items selected'
    const selectedCountElement = screen.getByLabelText('selected count')
    const optionElements = screen.getAllByRole('checkbox')
    const firstOptionElement = optionElements[0]
    const secondOptionElement = optionElements[1]
    
    expect(selectedCountElement.innerHTML).toBe(zeroItemSelected)

    userEvent.click(firstOptionElement) //select first option
    expect(selectedCountElement.innerHTML).toBe(oneItemSelected)

    userEvent.click(firstOptionElement) //deselect first option
    expect(selectedCountElement.innerHTML).toBe(zeroItemSelected)

    userEvent.click(firstOptionElement) //select first option
    userEvent.click(secondOptionElement) //select second option
    expect(selectedCountElement.innerHTML).toBe(twoItemsSelected)
  });

  it("should not show a label", () => {
    const labelElement = screen.queryByText(FAKE_LABEL);
    expect(labelElement).not.toBeInTheDocument();
  });
});

describe("SelectMulti with Label", () => {
  let mockOnValueChange: jest.Mock<any, any>;

  afterEach(cleanup);

  beforeEach(() => {
    mockOnValueChange = jest.fn()

    render(<SelectMulti onValueChange={(e) => mockOnValueChange(e)} options={FAKE_OPTIONS} label={FAKE_LABEL} />)
  })

  it("should show a label", () => {
    const labelElement = screen.getByText(FAKE_LABEL);
    expect(labelElement).toBeInTheDocument();
  });
})
