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
        onSelectpage={(e) => mockOnSelectPage(e)}
      />
    );
    baseElement = utils.baseElement;
  });

  it("should render successfully", () => {
    expect(baseElement).toBeTruthy();
  });

  it("should call onSelectpage if a page item is clicked", () => {
    const fakeIndex = 1; //random number chosen, but must be greater than 0 and less than the length of the array
    const selectedListItem = screen.getAllByRole("listitem")[fakeIndex];

    fireEvent.click(selectedListItem);

    expect(mockOnSelectPage).toHaveBeenCalledWith(fakeIndex + 1);
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
        onSelectpage={(e) => mockOnSelectPage(e)}
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
        onSelectpage={(e) => mockOnSelectPage(e)}
      />
    );
    baseElement = utils.baseElement;
    
    const listItems = screen.queryAllByRole("listitem");

    expect(listItems).toHaveLength(0)
  });
});
