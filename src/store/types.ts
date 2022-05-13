import { PlanetT } from "../components/planet/types";
import { PlanetsActionsE, SearchPlanetsByE, SortPlanetsByE } from "./enums";

export type PlanetsContextT = {
  planets: PlanetT[];
  filteredPlanets: PlanetT[];
  savePlanets: (payload: Array<PlanetT>) => void;
  searchPlanets: (playload: SearchPlanetsPayloadT) => void;
  sortFilteredPlanets: (payload: SortPlanetsByE) => void;
};

export type PlanetsStateT = {
  planets: Array<PlanetT>;
  filteredPlanets: Array<PlanetT>;
};

export type SearchPlanetsPayloadT = {
  query: Array<string>,
  key: SearchPlanetsByE
}

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
  payload: SearchPlanetsPayloadT;
};

export type Action =
  | UpdatePlanetsActionT
  | SortPlanetsActionT
  | SearchPlanetsActionT;
