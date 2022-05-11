import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from ".";

const FAKE_OPTIONS = new Set(["Unique option", "Something else", "Another option"]);
const FAKE_OPTIONS_ARRARY = [...FAKE_OPTIONS]
const FAKE_NAME = "fakeName";
const FAKE_DEFAULT = "All";
const FAKE_LABEL = "Select an option";

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

    expect(optionElements).toHaveLength(FAKE_OPTIONS.size);
    expect(firstOptionElement).toHaveAttribute("value", FAKE_OPTIONS_ARRARY[0]);
    expect(secondOptionElement).toHaveAttribute("value", FAKE_OPTIONS_ARRARY[1]);
    expect(thirdOptionElement).toHaveAttribute("value", FAKE_OPTIONS_ARRARY[2]);
  });

  it("should call onChange callback with the selected option value if a an option is selected", () => {
    const selectElement = screen.getByRole("combobox");

    userEvent.selectOptions(selectElement, FAKE_OPTIONS_ARRARY[0]);

    expect(mockOnClick).toHaveBeenCalledWith(FAKE_OPTIONS_ARRARY[0]);
  });

  it("should not show a label", () => {
    const labelElement = screen.queryByText(FAKE_LABEL);
    expect(labelElement).not.toBeInTheDocument();
  });

  it("should not show a search box", () => {
    const searchbox = screen.queryByRole("textbox");
    expect(searchbox).toBeFalsy();
  });
});

describe("Select with default value and label", () => {
  let mockOnClick: jest.Mock<any, any>;

  afterEach(cleanup);

  beforeEach(() => {
    mockOnClick = jest.fn();

    render(
      <Select
        defaultOption={FAKE_DEFAULT}
        label={FAKE_LABEL}
        options={FAKE_OPTIONS}
        name={FAKE_NAME}
        onChange={(e) => mockOnClick(e)}
      />
    );
  });

  it("should call render a default option with no value", () => {
    const optionElements = screen.getAllByRole("option");
    const firstOptionElement = optionElements[0];

    expect(optionElements).toHaveLength(FAKE_OPTIONS_ARRARY.length + 1);
    expect(firstOptionElement).toHaveAttribute("value", "");
    expect(firstOptionElement.innerHTML).toBe(FAKE_DEFAULT);
  });

  it("should show a label", () => {
    const labelElement = screen.getByText(FAKE_LABEL);
    expect(labelElement).toBeInTheDocument();
  });
});

describe("Searchable Select", () => {
  let mockOnClick: jest.Mock<any, any>;

  afterEach(cleanup);

  beforeEach(() => {
    mockOnClick = jest.fn();

    render(
      <Select
        label={FAKE_LABEL}
        options={FAKE_OPTIONS}
        name={FAKE_NAME}
        onChange={(e) => mockOnClick(e)}
        searchable
      />
    );
  });

  it("should contain a search box and a filterable list based on the query entered in the searchbox", () => {
    const searchBox = screen.getByRole("textbox");

    userEvent.type(searchBox, 'op')

    let optionElements = screen.getAllByRole("option");
    let firstOptionElement = optionElements[0];
    let secondOptionElement = optionElements[1];

    expect(optionElements).toHaveLength(2);
    expect(firstOptionElement).toHaveAttribute("value", FAKE_OPTIONS_ARRARY[0]);
    expect(secondOptionElement).toHaveAttribute("value", FAKE_OPTIONS_ARRARY[2]);

    fireEvent.change(searchBox, {target: {value: ''}})

    optionElements = screen.getAllByRole("option");
    firstOptionElement = optionElements[0];
    secondOptionElement = optionElements[1];
    const thirdOptionElement = optionElements[2];

    expect(optionElements).toHaveLength(FAKE_OPTIONS_ARRARY.length);
    expect(firstOptionElement).toHaveAttribute("value", FAKE_OPTIONS_ARRARY[0]);
    expect(secondOptionElement).toHaveAttribute("value", FAKE_OPTIONS_ARRARY[1]);
    expect(thirdOptionElement).toHaveAttribute("value", FAKE_OPTIONS_ARRARY[2]);
  });
});
