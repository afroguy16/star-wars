import { createContext, ReactNode, useCallback, useContext, useReducer } from "react"
import { PlanetT } from "../components/planet/types"
import { PlanetsActionsE, SortPlanetsByE } from "./enums"
import { initialState, planetsReducer } from "./planetsReducer"
import { PlanetsContextT } from "./types"

const PlanetsContext = createContext(initialState)

export const PlanetsProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(planetsReducer, initialState)

  const savePlanets = useCallback((payload: Array<PlanetT>) => {
    dispatch({
      type: PlanetsActionsE.SAVE_PLANETS,
      payload
    })
  }, [])

  const sortFilteredPlanets = useCallback((payload: SortPlanetsByE) => {
    dispatch({
      type: PlanetsActionsE.SORT_FILTERED_PLANETS,
      payload
    })
  }, [])

  const value: PlanetsContextT = {
    planets: state.planets,
    filteredPlanets: state.filteredPlanets,
    savePlanets,
    sortFilteredPlanets
  }

  return <PlanetsContext.Provider value={value}>{children}</PlanetsContext.Provider>
}

const usePlanetsContext = () => useContext(PlanetsContext) as PlanetsContextT

export default usePlanetsContext