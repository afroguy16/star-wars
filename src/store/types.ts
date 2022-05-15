import { PlanetT } from "../components/planet/types";
import { PlanetsActionsE, SortPlanetsByE } from "./enums";

export type PlanetsContextT = {
  planets: Array<PlanetT>;
  filteredPlanets: Array<PlanetT>;
  searchedPlanets: Array<PlanetT>;
  savePlanets: (payload: Array<PlanetT>) => void;
  searchPlanets: (payload: string) => void;
  filterPlanets: (payload: Array<string>) => void;
  sortSearchedPlanets: (payload: SortPlanetsByE) => void;
};

export type PlanetsStateT = {
  planets: Array<PlanetT>;
  searchedPlanets: Array<PlanetT>;
  filteredPlanets: Array<PlanetT>;
};

export type PlanetsActionsBaseT = {
  type: PlanetsActionsE;
};

export type UpdatePlanetsActionT = PlanetsActionsBaseT & {
  payload: Array<PlanetT>;
};

export type SortPlanetsActionT = PlanetsActionsBaseT & {
  payload: SortPlanetsByE;
};

export type SearchPlanetsActionT = PlanetsActionsBaseT & {
  payload: string;
};

export type FilterPlanetsActionT = PlanetsActionsBaseT & {
  payload: Array<string>;
};

export type Action =
  | UpdatePlanetsActionT
  | SortPlanetsActionT
  | SearchPlanetsActionT
  | FilterPlanetsActionT
