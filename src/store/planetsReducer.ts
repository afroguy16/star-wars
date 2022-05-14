import { PlanetT } from "../components/planet/types";
import { PlanetsActionsE, SearchPlanetsByE, SortPlanetsByE } from "./enums";
import { PlanetsStateT, Action, SearchPlanetsPayloadT } from "./types";

export const initialState: PlanetsStateT = {
  planets: [],
  filteredPlanets: [],
};

export const planetsReducer = (
  state: PlanetsStateT,
  { type, payload }: Action
): PlanetsStateT => {
  switch (type) {
    case PlanetsActionsE.SAVE_PLANETS:
      return {
        ...state,
        planets: [...(payload as Array<PlanetT>)],
        filteredPlanets: [...(payload as Array<PlanetT>)],
      };
    case PlanetsActionsE.SEARCH_PLANETS:
      const typedPayload = payload as SearchPlanetsPayloadT
      const filteredPlanets = search(typedPayload.key, typedPayload.query, state.planets)
      return {
        ...state,
        filteredPlanets: [...filteredPlanets],
      };
    case PlanetsActionsE.SORT_FILTERED_PLANETS:
      let sortedPlanets: Array<PlanetT>;
      switch (payload) {
        case SortPlanetsByE.NAME:
          sortedPlanets = sortPlanetsByName(state.filteredPlanets);
          break;
        case SortPlanetsByE.POPULATION:
          sortedPlanets = sortPlanetsByPopulation(state.filteredPlanets);
          break;
        case SortPlanetsByE.RESIDENTS:
          sortedPlanets = sortPlanetsByResidents(state.filteredPlanets);
          break;
        default:
          sortedPlanets = [...payload as Array<PlanetT>];
      }
      return {
        ...state,
        filteredPlanets: [...sortedPlanets],
      };
    default:
      return state;
  }
};

const sortPlanetsByName = (planets: Array<PlanetT>) =>
  planets.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

const sortPlanetsByPopulation = (planets: Array<PlanetT>) =>
  planets.sort((a, b) => a.population - b.population);

const sortPlanetsByResidents = (planets: Array<PlanetT>) =>
  planets.sort((a, b) => a.residents - b.residents);

const search = (
  key: SearchPlanetsByE,
  query: Array<string>,
  planets: Array<PlanetT>
) => {
  if (query.length === 0) return planets
  if (query.length === 1) return planets.filter((planet) => planet[key].includes(query[0]))

  const planetTerrain: Array<Array<string>> = []

  planets.forEach(
    (planet) =>
      planet.terrain !== ["unknown"] &&
      planet.terrain !== [""] &&
      planet.terrain.length > 0 &&
      planetTerrain.push(planet.terrain)
  );

  return searchMultiple(query, planetTerrain, planets)
}

const searchMultiple = (queryArray: Array<string>, terrainArray: Array<Array<string>>, planets: Array<PlanetT>) => {
  const mem: Array<number> = []

  terrainArray.forEach((arr, index) => {
    let matchFound = 0
    for (let j = 0; j < queryArray.length; j++) {
      if (arr.includes(queryArray[j])) {
        matchFound++
      }
    }
    if (matchFound === queryArray.length) {
      mem.push(index)
    }
  })

  return planets.filter((_, i) => mem.includes(i))
}
