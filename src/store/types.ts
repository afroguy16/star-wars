import { PlanetT } from "../components/planet/types";
import { PlanetsActionsE, SortPlanetsByE } from "./enums";

export type PlanetsContextT = {
  planets: PlanetT[];
  filteredPlanets: PlanetT[];
  savePlanets: (payload: Array<PlanetT>) => void;
  sortFilteredPlanets: (payload: SortPlanetsByE) => void;
};

export type PlanetsStateT = {
  planets: Array<PlanetT>;
  filteredPlanets: Array<PlanetT>;
};

export type PlanetsActionsBaseT = {
  type: PlanetsActionsE;
};

export type UpdatePlanetsActionT = PlanetsActionsBaseT & {
  payload: Array<PlanetT>;
}

export type SortPlanetsActionT = PlanetsActionsBaseT & {
  payload: SortPlanetsByE
}

export type Action = UpdatePlanetsActionT | SortPlanetsActionT
