import { PlanetT } from "../components/planet/types";
import { PlanetsActionsE } from "./enums";
import {
  PlanetsStateT,
  Action,
} from "./types";

export const initialState: PlanetsStateT = {
  planets: [],
  filteredPlanets: [],
};

export const planetsReducer = (state: PlanetsStateT, { type, payload }: Action): PlanetsStateT => {
  switch (type) {
    case PlanetsActionsE.SAVE_PLANETS:
      return {
        ...state,
        planets: [...payload as Array<PlanetT>],
        filteredPlanets: [...payload as Array<PlanetT>],
      };
    default:
      return state;
  }
};
