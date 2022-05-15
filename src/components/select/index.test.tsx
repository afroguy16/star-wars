import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from ".";

const FAKE_OPTIONS = new Set(["Unique option", "Something else", "Another option"]);
const FAKE_OPTIONS_ARRAY = [...FAKE_OPTIONS]
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
        onChange={(e) => mockOnClick(e)}
        label={FAKE_LABEL}
      />
    );
  });

  beforeEach(()=> {
    const toggleButton = screen.getByRole('button')
    userEvent.click(toggleButton)
  })

  it("should render a list of options that is equal the length of the array option prop", () => {
    const optionElements = screen.getAllByRole("option");
    const firstOptionElement = optionElements[0];
    const secondOptionElement = optionElements[1];
    const thirdOptionElement = optionElements[2];

    expect(optionElements).toHaveLength(FAKE_OPTIONS.size);
    expect(firstOptionElement.innerHTML).toContain(FAKE_OPTIONS_ARRAY[0]);
    expect(secondOptionElement.innerHTML).toContain(FAKE_OPTIONS_ARRAY[1]);
    expect(thirdOptionElement.innerHTML).toContain(FAKE_OPTIONS_ARRAY[2]);
  });

  it("should call onChange callback with the selected option value and the option should be marked as selected if a an option is selected", () => {
    const optionElements = screen.getAllByRole("option");
    const firstOptionElement = optionElements[0];
    const secondOptionElement = optionElements[1];
    const thirdOptionElement = optionElements[2];

    userEvent.click(firstOptionElement)
    expect(firstOptionElement).toHaveAttribute('aria-selected', 'true')
    expect(secondOptionElement).toHaveAttribute('aria-selected', 'false')
    expect(thirdOptionElement).toHaveAttribute('aria-selected', 'false')
    expect(mockOnClick).toHaveBeenLastCalledWith(FAKE_OPTIONS_ARRAY[0]);

    userEvent.click(secondOptionElement)
    expect(firstOptionElement).toHaveAttribute('aria-selected', 'false')
    expect(secondOptionElement).toHaveAttribute('aria-selected', 'true')
    expect(thirdOptionElement).toHaveAttribute('aria-selected', 'false')
    expect(mockOnClick).toHaveBeenLastCalledWith(FAKE_OPTIONS_ARRAY[1]);

    userEvent.click(thirdOptionElement)
    expect(firstOptionElement).toHaveAttribute('aria-selected', 'false')
    expect(secondOptionElement).toHaveAttribute('aria-selected', 'false')
    expect(thirdOptionElement).toHaveAttribute('aria-selected', 'true')
    expect(mockOnClick).toHaveBeenLastCalledWith(FAKE_OPTIONS_ARRAY[2]);
  });

  it("should not show a search box", () => {
    const searchbox = screen.queryByRole("textbox");
    expect(searchbox).toBeFalsy();
  });
});

describe("Select with default value", () => {
  let mockOnClick: jest.Mock<any, any>;

  afterEach(cleanup);

  beforeEach(() => {
    mockOnClick = jest.fn();

    render(
      <Select
        defaultOption={FAKE_DEFAULT}
        label={FAKE_LABEL}
        options={FAKE_OPTIONS}
        onChange={(e) => mockOnClick(e)}
      />
    );
  });

  beforeEach(()=> {
    const toggleButton = screen.getByRole('button')
    userEvent.click(toggleButton)
  })

  it("should call render a default option with no value", () => {
    const optionElements = screen.getAllByRole("option");
    const firstOptionElement = optionElements[0];
    const secondOptionElement = optionElements[1];
    const thirdOptionElement = optionElements[2];
    const fourthOptionElement = optionElements[3];

    expect(optionElements).toHaveLength(FAKE_OPTIONS_ARRAY.length + 1);
    expect(firstOptionElement.innerHTML).toContain(FAKE_DEFAULT);

    userEvent.click(firstOptionElement)
    expect(firstOptionElement).toHaveAttribute('aria-selected', 'true')
    expect(secondOptionElement).toHaveAttribute('aria-selected', 'false')
    expect(thirdOptionElement).toHaveAttribute('aria-selected', 'false')
    expect(fourthOptionElement).toHaveAttribute('aria-selected', 'false')
    expect(mockOnClick).toHaveBeenLastCalledWith("");
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
        onChange={(e) => mockOnClick(e)}
        searchable
      />
    );
  });

  beforeEach(()=> {
    const toggleButton = screen.getByRole('button')
    userEvent.click(toggleButton)
  })

  it("search box should contain 'search items'", () => {
    const searchBox = screen.getByRole("textbox");
    expect(searchBox).toHaveAttribute('placeholder', 'Search items');
  });

  it("should contain a search box and a filterable list based on the query entered in the searchbox", () => {
    const searchBox = screen.getByRole("textbox");

    userEvent.type(searchBox, 'op')

    let optionElements = screen.getAllByRole("option");
    let firstOptionElement = optionElements[0];
    let secondOptionElement = optionElements[1];

    expect(optionElements).toHaveLength(2);
    expect(firstOptionElement.innerHTML).toContain(FAKE_OPTIONS_ARRAY[0]);
    expect(secondOptionElement.innerHTML).toContain(FAKE_OPTIONS_ARRAY[2]);

    fireEvent.change(searchBox, {target: {value: ''}})

    optionElements = screen.getAllByRole("option");
    firstOptionElement = optionElements[0];
    secondOptionElement = optionElements[1];
    const thirdOptionElement = optionElements[2];

    expect(optionElements).toHaveLength(FAKE_OPTIONS_ARRAY.length);
    expect(firstOptionElement.innerHTML).toContain(FAKE_OPTIONS_ARRAY[0]);
    expect(secondOptionElement.innerHTML).toContain(FAKE_OPTIONS_ARRAY[1]);
    expect(thirdOptionElement.innerHTML).toContain(FAKE_OPTIONS_ARRAY[2]);
  });
});

describe("Searchable Select with searchable label", () => {
  let mockOnClick: jest.Mock<any, any>;
  const searchableLabel = 'Search dummy items'

  afterEach(cleanup);

  beforeEach(() => {
    mockOnClick = jest.fn();

    render(
      <Select
        label={FAKE_LABEL}
        options={FAKE_OPTIONS}
        onChange={(e) => mockOnClick(e)}
        searchable
        searchableLabel={searchableLabel}
      />
    );
  });

  beforeEach(()=> {
    const toggleButton = screen.getByRole('button')
    userEvent.click(toggleButton)
  })

  it("search box should contain 'search items'", () => {
    const searchBox = screen.getByRole("textbox");
    expect(searchBox).toHaveAttribute('placeholder', searchableLabel);
  });
});
