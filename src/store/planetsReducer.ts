import { PlanetActionsE } from "./enums";
import { PlanetActionsT, PlanetsStateT } from "./types";

export const initialState: PlanetsStateT = {
  planets: [],
  filteredPlanets: []
}

export const planetsReducer = (state: PlanetsStateT, { type, payload }: PlanetActionsT) => {
  switch (type) {
    case PlanetActionsE.SAVE_PLANETS:
      if (payload) {
        return {
          ...state,
          planets: [...payload],
          filteredPlanets: [...payload]
        }
      }
      throw new Error('Payload must not be undefined')
    default:
      return state;
  }
}