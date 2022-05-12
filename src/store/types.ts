import { PlanetT } from "../components/planet/types"
import { PlanetActionsE } from "./enums"

export type PlanetsStateT = {
    planets: Array<PlanetT>
    filteredPlanets: Array<PlanetT>
}

export type PlanetActionsT = {
    type: PlanetActionsE
    payload?: Array<PlanetT>
}

export type PlanetProviderT = {
    planets: PlanetT[];
    filteredPlanets: PlanetT[];
    savePlanets: (payload: Array<PlanetT>) => void;
}