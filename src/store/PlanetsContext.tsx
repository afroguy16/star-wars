import { createContext, ReactNode, useCallback, useContext, useReducer } from "react"
import { PlanetT } from "../components/planet/types"
import { PlanetActionsE } from "./enums"
import { initialState, planetsReducer } from "./planetsReducer"
import { PlanetProviderT } from "./types"

const PlanetsContext = createContext(initialState)

export const PlanetsProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(planetsReducer, initialState)

  const savePlanets = useCallback((payload: Array<PlanetT>) => {
    dispatch({
      type: PlanetActionsE.SAVE_PLANETS,
      payload
    })
  }, [])

  const value = {
    planets: state.planets,
    filteredPlanets: state.filteredPlanets,
    savePlanets
  }

  return <PlanetsContext.Provider value={value}>{children}</PlanetsContext.Provider>
}

const usePlanetsContext = () => useContext(PlanetsContext) as PlanetProviderT

export default usePlanetsContext