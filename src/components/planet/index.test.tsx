import { render, cleanup, screen } from "@testing-library/react"
import Planet from ".";
import { PlanetT } from "./types";

const FAKE_PLANET: PlanetT = {
  name: 'fake name',
  terrain: ['fakeT1', 'fakeT2', 'fakeT3'],
  climate: ['fakeC1', 'fakeC2'],
  population: 23232,
  residents: 938
}

const FAKE_PLANET_WITH_UKNOWN_POPULATION: PlanetT = {
  ...FAKE_PLANET,
  population: -1
}


describe("Planet", () => {
  afterEach(cleanup)

  beforeEach(() => {
    render(<Planet meta={FAKE_PLANET} />)
  });

  it("should render all meta data in the page", () => {
    const climateItems = screen.getAllByRole('list')[0].getElementsByTagName('li')
    const nameText = screen.getByText(FAKE_PLANET.name)
    const populationText = screen.getByText(FAKE_PLANET.population.toLocaleString())
    const residentsText = screen.getByText(FAKE_PLANET.residents)
    const terrainItems = screen.getAllByRole('list')[1].getElementsByTagName('li')
    
    expect(climateItems.length).toBe(FAKE_PLANET.climate.length)
    expect(nameText).toBeInTheDocument()
    expect(populationText).toBeInTheDocument()
    expect(residentsText).toBeInTheDocument()
    expect(terrainItems.length).toBe(FAKE_PLANET.terrain.length)
  });
});

describe("Planet with unknow population", () => {
  afterEach(cleanup)

  beforeEach(() => {
    render(<Planet meta={FAKE_PLANET_WITH_UKNOWN_POPULATION} />)
  });

  it("should render unknow if population is less than 0", () => {
    const populationText = screen.getByText("unknown")

    expect(populationText).toBeInTheDocument()
  });
});
