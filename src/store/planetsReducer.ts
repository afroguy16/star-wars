import { PlanetT } from "../components/planet/types";
import useSearch from "../hooks/search";
import {
  PlanetsActionsE,
  SearchOrFilterPlanetsByE,
  SortPlanetsByE,
} from "./enums";
import { PlanetsStateT, Action } from "./types";

export const initialState: PlanetsStateT = {
  planets: [],
  filteredPlanets: [],
  searchedPlanets: [],
};

export const usePlanetsReducer = (
  state: PlanetsStateT,
  { type, payload }: Action
): PlanetsStateT => {
  const { search } = useSearch();

  switch (type) {
    case PlanetsActionsE.SAVE_PLANETS:
      return {
        ...state,
        planets: [...(payload as Array<PlanetT>)],
        searchedPlanets: [...(payload as Array<PlanetT>)],
        filteredPlanets: [...(payload as Array<PlanetT>)],
      };

    case PlanetsActionsE.SEARCH_PLANETS:
      const searchedPlanets = search(
        SearchOrFilterPlanetsByE.NAME,
        [payload as string],
        [...state.planets]
      ) as Array<PlanetT>;
      return {
        ...state,
        searchedPlanets: [...searchedPlanets],
        filteredPlanets: [...searchedPlanets],
      };

    case PlanetsActionsE.FILTER_PLANETS:
      const filteredPlanets = search(
        SearchOrFilterPlanetsByE.TERRAIN,
        payload as Array<string>,
        [...state.searchedPlanets]
      ) as Array<PlanetT>;
      return {
        ...state,
        filteredPlanets: [...filteredPlanets],
      };

    case PlanetsActionsE.SORT_FILTERED_PLANETS:
      let sortedPlanets: Array<PlanetT>
      let sortedSearchedPlanets: Array<PlanetT>;
      switch (payload) {
        case SortPlanetsByE.NAME:
          sortedPlanets = sortPlanetsByName([...state.planets]);
          sortedSearchedPlanets = sortPlanetsByName([...state.searchedPlanets]);
          break;
        case SortPlanetsByE.POPULATION:
          sortedPlanets = sortPlanetsByPopulation([...state.planets]);
          sortedSearchedPlanets = sortPlanetsByPopulation([...state.searchedPlanets]);
          break;
        case SortPlanetsByE.RESIDENTS:
          sortedPlanets = sortPlanetsByResidents([...state.planets]);
          sortedSearchedPlanets = sortPlanetsByResidents([...state.searchedPlanets]);
          break;
        default:
          sortedPlanets = [...state.planets];
          sortedSearchedPlanets = [...state.planets];
      }
      return {
        ...state,
        planets: [...sortedPlanets],
        searchedPlanets: [...sortedSearchedPlanets],
        filteredPlanets: [...sortedSearchedPlanets]
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
