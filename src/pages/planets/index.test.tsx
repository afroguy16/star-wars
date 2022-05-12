import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Planets from ".";
import data from "../../data/planets.json";
import { results as mockResults, sortedResultsByName } from "../../mocks/transformed-planets-response";
import { PlanetsProvider } from "../../store/PlanetsContext";

describe("Planets", () => {
  let baseElement: HTMLElement;

  afterEach(cleanup);

  beforeEach(() => {
    const utils = render(<PlanetsProvider><Planets /></PlanetsProvider>);
    baseElement = utils.baseElement;
  });

  it("should render successfully", () => {
    expect(baseElement).toBeTruthy();
  });

  it("should rentur a list of 10 planets on the page", () => {
    const planetElementsCount = screen.getAllByRole('list')[0].childElementCount
    expect(planetElementsCount).toBe(10)
  });

  it("should renturn a list which contains the first and tenth payload name", () => {
    const firstItemName = data.results[0].name
    const tenthItemName = data.results[9].name
    const firstItemElement = screen.getByText(firstItemName)
    const tenthItemElement = screen.getByText(tenthItemName)
    expect(firstItemElement).toBeInTheDocument()
    expect(tenthItemElement).toBeInTheDocument()
  });

  // description is too long
  it("should renturn a list which contains the eleventh and twentieth when the next button is clicked after page renders and it should should the first and tenth payload name when previous button is clicked again", () => {
    const eleventhItemName = data.results[10].name
    const twentiethItemName = data.results[19].name
    const paginationButtons = screen.getAllByRole('button')
    const previousButton = paginationButtons[0]
    const nextButton = paginationButtons[paginationButtons.length - 1]

    fireEvent.click(nextButton)

    const eleventhItemElement = screen.getByText(eleventhItemName)
    const twentiethItemElement = screen.getByText(twentiethItemName)

    expect(eleventhItemElement).toBeInTheDocument()
    expect(twentiethItemElement).toBeInTheDocument()

    fireEvent.click(previousButton)

    const firstItemName = data.results[0].name
    const tenthItemName = data.results[9].name
    const firstItemElement = screen.getByText(firstItemName)
    const tenthItemElement = screen.getByText(tenthItemName)

    expect(firstItemElement).toBeInTheDocument()
    expect(tenthItemElement).toBeInTheDocument()
  });

  it("should renturn a list which contains the fifty first item and sixtieth item payload name", () => {
    const fiftyFirstItem = data.results[50].name
    const sixtiethItem = data.results[59].name

    const sixthPaginationItem = screen.getByTestId('pagination-control-wrapper').getElementsByTagName('li')[5]
    fireEvent.click(sixthPaginationItem)

    
    const fiftyfirstItemElement = screen.getByText(fiftyFirstItem)
    const sixtiethItemElement = screen.getByText(sixtiethItem)

    expect(fiftyfirstItemElement).toBeInTheDocument()
    expect(sixtiethItemElement).toBeInTheDocument()
  });
});

describe("Planets", () => {
  let baseElement: HTMLElement;

  afterEach(cleanup);

  beforeEach(() => {
    jest.mock("../../data/planets.json", () => mockResults)
  })

  beforeEach(() => {
    const utils = render(<PlanetsProvider><Planets /></PlanetsProvider>);
    baseElement = utils.baseElement;
  })

  it("should return a list sorted by name if it is sorted by name", () => {
    const sortElement = screen.getByTestId('sort')
    const sortByNameElement = sortElement.getElementsByTagName('option')[0] //test is reliant on the position in the dom
    userEvent.click(sortByNameElement)
    
    const planetElements = screen.getAllByLabelText('planet')
    const firstPlanetElement = planetElements[0]
    expect(firstPlanetElement.innerHTML).toContain(sortedResultsByName[0].name)
  });
})
