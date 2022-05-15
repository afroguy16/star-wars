import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaginationControls from ".";
import { results } from "../../mocks/transformed-planets-response";

const FAKE_PER_PAGE = 2; //could be any number, but must be greater than zero and less than the length of the array used

describe("PaginationControls with perPage and totalCount greater than zero", () => {
  let mockOnSelectPage: jest.Mock<any, any>;

  afterEach(cleanup);

  beforeEach(() => {
    mockOnSelectPage = jest.fn();

    render(
      <PaginationControls
        perPage={FAKE_PER_PAGE}
        totalCount={results.length}
        onSelectPage={(e) => mockOnSelectPage(e)}
      />
    );
  });

  it("should activate selected listitem and call onSelectpage with page number when a page item is clicked", () => {
    const fakeIndex = 1; //random number chosen, but must be greater than 0 and less than the length of the array
    const selectedListItem = screen.getAllByRole("listitem")[fakeIndex];

    userEvent.click(selectedListItem);

    expect(mockOnSelectPage).toHaveBeenCalledWith(fakeIndex + 1);
    expect(selectedListItem).toHaveClass("active");
  });

  it("should activate the previous and next page and call onSelectpage with the activated page numbers when the previous or next button is clicked", () => {
    const paginationButtons = screen.getAllByRole('button')
    const previousButton = paginationButtons[0];
    const nextButton = paginationButtons[paginationButtons.length - 1];
    const firstPageIndex = 0;
    const secondPageIndex = 1;

    userEvent.click(nextButton);
    expect(mockOnSelectPage).toHaveBeenCalledWith(2);

    let activeListItem = screen.getAllByRole("listitem")[secondPageIndex];
    expect(activeListItem).toHaveClass("active");

    userEvent.click(previousButton);
    expect(mockOnSelectPage).toHaveBeenCalledWith(1);

    activeListItem = screen.getAllByRole("listitem")[firstPageIndex];
    expect(activeListItem).toHaveClass("active");
  });

  it("next button should be disabled on the first page and previous button should be disabled on the last page", () => {
    const paginationButtons = screen.getAllByRole('button')
    const previousButton = paginationButtons[0];
    const nextButton = paginationButtons[paginationButtons.length - 1];

    expect(previousButton).toHaveAttribute("disabled");

    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    expect(nextButton).toHaveAttribute("disabled");
  });
});

describe("PaginationControls with perPage and totalCount greater less than zero", () => {
  let mockOnSelectPage: jest.Mock<any, any>;

  afterEach(cleanup);

  beforeEach(() => {
    mockOnSelectPage = jest.fn();
  });

  it("should return no list item if perPage is zero", () => {
    render(
      <PaginationControls
        perPage={0}
        totalCount={results.length}
        onSelectPage={(e) => mockOnSelectPage(e)}
      />
    );

    const listItems = screen.queryAllByRole("listitem");

    expect(listItems).toHaveLength(0);
  });

  it("should return no list item if totalCount is zero", () => {
    render(
      <PaginationControls
        perPage={10}
        totalCount={0}
        onSelectPage={(e) => mockOnSelectPage(e)}
      />
    );

    const listItems = screen.queryAllByRole("listitem");

    expect(listItems).toHaveLength(0);
  });
});
