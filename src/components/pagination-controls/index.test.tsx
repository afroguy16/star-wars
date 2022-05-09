import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import PaginationControls from ".";
import { results } from "../../mocks/transformed-planets-response";

const FAKE_PER_PAGE = 2; //could be any number, but must be greater than zero and less than the length of the array used

describe("PaginationControls with perPage and totalCount greater than zero", () => {
  let baseElement: HTMLElement;
  let mockOnSelectPage: jest.Mock<any, any>;

  afterEach(cleanup);

  beforeEach(() => {
    mockOnSelectPage = jest.fn();

    const utils = render(
      <PaginationControls
        perPage={FAKE_PER_PAGE}
        totalCount={results.length}
        onSelectPage={(e) => mockOnSelectPage(e)}
      />
    );
    baseElement = utils.baseElement;
  });

  it("should render successfully", () => {
    expect(baseElement).toBeTruthy();
  });

  it("should call onSelectpage with page number if a page item is clicked", () => {
    const fakeIndex = 1; //random number chosen, but must be greater than 0 and less than the length of the array
    const selectedListItem = screen.getAllByRole("listitem")[fakeIndex];

    fireEvent.click(selectedListItem);

    expect(mockOnSelectPage).toHaveBeenCalledWith(fakeIndex + 1);
  });

  it("should call onSelectpage with the appropriate previous or next page number if the previous or next button is clicked", () => {
    const previousButton = screen.getAllByRole("button")[0];
    const nextButton = screen.getAllByRole("button")[1];

    fireEvent.click(nextButton);
    expect(mockOnSelectPage).toHaveBeenCalledWith(2);

    fireEvent.click(previousButton);
    expect(mockOnSelectPage).toHaveBeenCalledWith(1);
  });

  it("next button should be disabled on the first page and previous button should be disabled on the last page", () => {
    const previousButton = screen.getAllByRole("button")[0];
    const nextButton = screen.getAllByRole("button")[1];
  
    expect(previousButton).toHaveAttribute('disabled')
  
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(nextButton).toHaveAttribute('disabled')
  });
});

describe("PaginationControls with perPage and totalCount greater less than zero", () => {
  let baseElement: HTMLElement;
  let mockOnSelectPage: jest.Mock<any, any>;

  afterEach(cleanup);

  beforeEach(() => {
    mockOnSelectPage = jest.fn();
  });

  it("should return no list item if perPage is zero", () => {
    const utils = render(
      <PaginationControls
        perPage={0}
        totalCount={results.length}
        onSelectPage={(e) => mockOnSelectPage(e)}
      />
    );
    baseElement = utils.baseElement;

    const listItems = screen.queryAllByRole("listitem");

    expect(listItems).toHaveLength(0)
  });

  it("should return no list item if totalCount is zero", () => {
    const utils = render(
      <PaginationControls
        perPage={10}
        totalCount={0}
        onSelectPage={(e) => mockOnSelectPage(e)}
      />
    );
    baseElement = utils.baseElement;
    
    const listItems = screen.queryAllByRole("listitem");

    expect(listItems).toHaveLength(0)
  });
});
