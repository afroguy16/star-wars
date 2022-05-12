import { useCallback } from "react"
import planets from "../../data/planets.json"
import { PlanetT } from "../../components/planet/types"

type UsePlanets = {
  fetchPlanets: () => Array<PlanetT>
};

function usePlanets(): UsePlanets {
  const fetchPlanets = useCallback((): Array<PlanetT> => {
    const results = planets.results.map((planet) => {
      const { name, climate, terrain, population, residents } = planet;
      return {
        name,
        climate: climate.split(",").map((item) => item.trim()),
        terrain: terrain.split(",").map((item) => item.trim()),
        population,
        residents: residents?.length.toString(),
      };
    });

    return results
  }, []);

  return { fetchPlanets };
}

export { usePlanets };
