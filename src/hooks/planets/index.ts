import planets from "../../data/planets.json";
import { PlanetT } from "../../components/planet/types";

type UsePlanets = {
  fetchPlanets: () => Array<PlanetT>;
};

function usePlanets(): UsePlanets {
  const fetchPlanets = () => {
    return planets.results?.map((planet) => {
      const { name, climate, terrain, population, residents } = planet;
      return {
        name,
        climate: climate.split(","),
        terrain: terrain.split(","),
        population,
        residents: residents?.length.toString()
      };
    });
  };

  return { fetchPlanets };
}

export { usePlanets };
