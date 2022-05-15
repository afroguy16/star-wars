import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Planets from ".";
import data from "../../data/planets.json";
import {
  sortedResultsByName,
  sortedResultsByPopulation,
  sortedResultsByResidents
} from "../../mocks/transformed-planets-response";
import { PlanetsProvider } from "../../store/PlanetsContext";


describe("Planets display and Pagination", () => {
  beforeEach(() => {
    render(
      <PlanetsProvider>
        <Planets />
      </PlanetsProvider>
    );
  });

  afterEach(cleanup);

  it("should rentur a list of 10 planets on the page", () => {
    const planetElementsCount =
      screen.getAllByRole("list")[0].childElementCount;
    expect(planetElementsCount).toBe(10);
  });

  it("should renturn a list which contains the first and tenth payload name", () => {
    const firstItemName = data.results[0].name;
    const tenthItemName = data.results[9].name;
    const firstItemElement = screen.getByText(firstItemName);
    const tenthItemElement = screen.getByText(tenthItemName);
    expect(firstItemElement).toBeInTheDocument();
    expect(tenthItemElement).toBeInTheDocument();
  });

  // description is too long
  it("should renturn a list which contains the eleventh and twentieth when the next button is clicked after page renders and it should should the first and tenth payload name when previous button is clicked again", () => {
    const eleventhItemName = data.results[10].name;
    const twentiethItemName = data.results[19].name;
    const paginationControl = screen.getByTestId("pagination-control")
    const paginationButtons = paginationControl.querySelectorAll("button");
    const previousButton = paginationButtons[0];
    const nextButton = paginationButtons[paginationButtons.length - 1];

    fireEvent.click(nextButton);

    const eleventhItemElement = screen.getByText(eleventhItemName);
    const twentiethItemElement = screen.getByText(twentiethItemName);

    expect(eleventhItemElement).toBeInTheDocument();
    expect(twentiethItemElement).toBeInTheDocument();

    fireEvent.click(previousButton);

    const firstItemName = data.results[0].name;
    const tenthItemName = data.results[9].name;
    const firstItemElement = screen.getByText(firstItemName);
    const tenthItemElement = screen.getByText(tenthItemName);

    expect(firstItemElement).toBeInTheDocument();
    expect(tenthItemElement).toBeInTheDocument();
  });

  it("should renturn a list which contains the fifty first item and sixtieth item payload name", () => {
    const fiftyFirstItem = data.results[50].name;
    const sixtiethItem = data.results[59].name;

    const sixthPaginationItem = screen
      .getByTestId("pagination-control-wrapper")
      .getElementsByTagName("li")[5];
    fireEvent.click(sixthPaginationItem);

    const fiftyfirstItemElement = screen.getByText(fiftyFirstItem);
    const sixtiethItemElement = screen.getByText(sixtiethItem);

    expect(fiftyfirstItemElement).toBeInTheDocument();
    expect(sixtiethItemElement).toBeInTheDocument();
  });
});

describe("Planets Sorting", () => {
  let sortOptionsElement: HTMLCollectionOf<HTMLLIElement>

  afterEach(cleanup);

  beforeEach(() => {
    render(
      <PlanetsProvider>
        <Planets />
      </PlanetsProvider>
    );
  });

  beforeEach(()=> {
    const sortElement = screen.getByTestId("sort");
    const toggleButton = sortElement.getElementsByTagName('button')[0]

    userEvent.click(toggleButton)

    sortOptionsElement = sortElement.getElementsByTagName('li')
  })

  it("should return a list sorted by name if it is sorted by name", () => {
    const firstOptionElement = sortOptionsElement[0]
    userEvent.click(firstOptionElement)

    const planetElements = screen.getAllByLabelText("planet");
    const firstPlanetElement = planetElements[0];

    expect(firstPlanetElement.innerHTML).toContain(sortedResultsByName[0].name);
  });

  it("should return a list sorted by population if it is sorted by population", () => {
    const secondOptionElement = sortOptionsElement[1]
    userEvent.click(secondOptionElement)

    const planetElements = screen.getAllByLabelText("planet");
    const firstPlanetElement = planetElements[0];
    expect(firstPlanetElement.innerHTML).toContain(
      sortedResultsByPopulation[0].name
    );
  });

  it("should return a list sorted by residents if it is sorted by residents", () => {
    const thirdOptionElement = sortOptionsElement[2]
    userEvent.click(thirdOptionElement);

    const planetElements = screen.getAllByLabelText("planet");
    const firstPlanetElement = planetElements[0];
    expect(firstPlanetElement.innerHTML).toContain(sortedResultsByResidents[0].name);
  });
});

describe("Planets Searching and Filtering", () => {
  afterEach(cleanup);

  beforeEach(() => {
    render(
      <PlanetsProvider>
        <Planets />
      </PlanetsProvider>
    );
  });

  it("should return a list available planets that matches search query", () => {
    const searchBox = screen.getAllByRole("textbox")[0]

    userEvent.type(searchBox, 'da')

    const planetElements = screen.getAllByLabelText("planet")

    expect(planetElements).toHaveLength(5)
  });

  it("should return a list available planets that matches selected terrain", () => {
    const toggleButton = screen.getByTestId('sort-filter-search').querySelector('button')!
    userEvent.click(toggleButton)

    let terrainFilterOptions = screen.getAllByRole("checkbox")
    let thirdOptionElement = terrainFilterOptions[2]
    let fourthOptionElement = terrainFilterOptions[3]

    userEvent.click(thirdOptionElement)
    let planetElements = screen.getAllByLabelText("planet")
    expect(planetElements).toHaveLength(1)

    userEvent.click(fourthOptionElement)
    planetElements = screen.getAllByLabelText("planet")
    expect(planetElements).toHaveLength(1)
  });
});
