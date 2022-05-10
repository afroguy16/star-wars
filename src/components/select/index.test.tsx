import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from ".";

const FAKE_OPTIONS = ["option1", "option2", "option3"];
const FAKE_NAME = "fakeName";
const FAKE_DEFAULT = "All"

describe("Select", () => {
  let mockOnClick: jest.Mock<any, any>;

  afterEach(cleanup);

  beforeEach(() => {
    mockOnClick = jest.fn();

    render(
      <Select
        options={FAKE_OPTIONS}
        name={FAKE_NAME}
        onChange={(e) => mockOnClick(e)}
      />
    );
  });

  it("should have a Select item with a name attibute that is equal to prop name", () => {
    const selectElement = screen.getByRole("combobox");

    expect(selectElement).toHaveAttribute("name", FAKE_NAME);
  });

  it("should render a list of options that is equal the length of the array option prop", () => {
    const optionElements = screen.getAllByRole("option");
    const firstOptionElement = optionElements[0];
    const secondOptionElement = optionElements[1];
    const thirdOptionElement = optionElements[2];

    expect(optionElements).toHaveLength(FAKE_OPTIONS.length);
    expect(firstOptionElement).toHaveAttribute("value", FAKE_OPTIONS[0]);
    expect(secondOptionElement).toHaveAttribute("value", FAKE_OPTIONS[1]);
    expect(thirdOptionElement).toHaveAttribute("value", FAKE_OPTIONS[2]);
  });

  it("should call onChange callback with the selected option value if a an option is selected", () => {
    const selectElement = screen.getByRole("combobox");

    userEvent.selectOptions(selectElement, FAKE_OPTIONS[0]);

    expect(mockOnClick).toHaveBeenCalledWith(FAKE_OPTIONS[0]);
  });
});

describe("Select with default value", () => {
  let baseElement: HTMLElement;
  let mockOnClick: jest.Mock<any, any>;

  afterEach(cleanup);

  beforeEach(() => {
    mockOnClick = jest.fn();

    const utils = render(
      <Select
        defaultOption={FAKE_DEFAULT}
        options={FAKE_OPTIONS}
        name={FAKE_NAME}
        onChange={(e) => mockOnClick(e)}
      />
    );
    baseElement = utils.baseElement;
  });

  it("should call render a default option with no value", () => {
    const optionElements = screen.getAllByRole("option");
    const firstOptionElement = optionElements[0];

    expect(optionElements).toHaveLength(FAKE_OPTIONS.length + 1);
    expect(firstOptionElement).toHaveAttribute('value', '')
    expect(firstOptionElement.innerHTML).toBe(FAKE_DEFAULT)
  });
})
