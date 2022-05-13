import { PlanetT } from "../components/planet/types";
import { PlanetsActionsE, SortPlanetsByE } from "./enums";
import { PlanetsStateT, Action } from "./types";

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
    case PlanetsActionsE.SORT_FILTERED_PLANETS:
      let sortedPlanets: Array<PlanetT>
      switch (payload) {
        case SortPlanetsByE.NAME:
          sortedPlanets = sortPlanetsByName(state.filteredPlanets)
          break
        case SortPlanetsByE.POPULATION:
          sortedPlanets = sortPlanetsByPopulation(state.filteredPlanets)
          break
        case SortPlanetsByE.RESIDENTS:
          sortedPlanets = sortPlanetsByResidents(state.filteredPlanets)
          break
        default:
          sortedPlanets = [...payload];
      }
      return {
        ...state,
        filteredPlanets: [...sortedPlanets],
      };
    default:
      return state;
  }
};

const sortPlanetsByName = (planets: Array<PlanetT>) => (
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
  })
)

const sortPlanetsByPopulation = (planets: Array<PlanetT>) => (
  planets.sort((a, b) => a.population - b.population)
)

const sortPlanetsByResidents = (planets: Array<PlanetT>) => (
  planets.sort((a, b) => a.residents - b.residents)
)