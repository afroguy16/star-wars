import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Planets from ".";
import data from "../../data/planets.json";
import {
  sortedResultsByName,
  sortedResultsByPopulation,
  sortedResultsByResidents,
  mockSearchResult
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
    const paginationButtons = screen.getAllByRole("button");
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
  afterEach(cleanup);

  beforeEach(() => {
    render(
      <PlanetsProvider>
        <Planets />
      </PlanetsProvider>
    );
  });

  it("should return a list sorted by name if it is sorted by name", () => {
    const sortElement = screen.getByTestId("sort");
    fireEvent.change(sortElement, { target: { value: "name" } });

    const planetElements = screen.getAllByLabelText("planet");
    const firstPlanetElement = planetElements[0];

    expect(firstPlanetElement.innerHTML).toContain(sortedResultsByName[0].name);
  });

  it("should return a list sorted by population if it is sorted by population", () => {
    const sortElement = screen.getByTestId("sort");
    fireEvent.change(sortElement, { target: { value: "population" } });

    const planetElements = screen.getAllByLabelText("planet");
    const firstPlanetElement = planetElements[0];
    expect(firstPlanetElement.innerHTML).toContain(
      sortedResultsByPopulation[0].name
    );
  });

  it("should return a list sorted by residents if it is sorted by residents", () => {
    const sortElement = screen.getByTestId("sort");
    fireEvent.change(sortElement, { target: { value: "residents" } });

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
    const searchBox = screen.getByRole("textbox")

    userEvent.type(searchBox, 'da')

    const planetElements = screen.getAllByLabelText("planet")
    const firstPlanetElement = planetElements[0];

    expect(planetElements).toHaveLength(1)
    expect(firstPlanetElement.innerHTML).toContain(mockSearchResult[0].name)
  });

  it("should return a list available planets that matches selected terrain", () => {
    let terrainFilterOptions = screen.getAllByRole("checkbox")
    let firstOptionElement = terrainFilterOptions[0]
    let secondOptionElement = terrainFilterOptions[1]

    userEvent.click(firstOptionElement)
    let planetElements = screen.getAllByLabelText("planet")
    const firstPlanetElement = planetElements[0]
    expect(planetElements).toHaveLength(12)
    expect(firstPlanetElement.innerHTML).toContain(data.results[0].name)

    userEvent.click(secondOptionElement)
    planetElements = screen.getAllByLabelText("planet")
    const secondPlanetElement = planetElements[0]
    expect(planetElements).toHaveLength(18)
    expect(firstPlanetElement.innerHTML).toContain(data.results[0].name)
    expect(secondPlanetElement.innerHTML).toContain(data.results[0].name)
  });
});
