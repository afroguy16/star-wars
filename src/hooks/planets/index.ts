import planets from "../../data/planets.json";
import { PlanetT } from "../../components/planet/types";
import { PaginationConfig } from "./types";
import { usePaginate } from "../paginate";
import { PlanetsData } from "../../data/types";

type UsePlanets = {
  fetchPlanets: (paginationConfig?: PaginationConfig) => Array<PlanetT>;
};

function usePlanets(): UsePlanets {
  const { paginate } = usePaginate();

  const fetchPlanets = (paginationConfig?: PaginationConfig) => {
    const transformedPlanets = paginationConfig
      ? (paginate(
        planets.results,
        paginationConfig.perPage,
        paginationConfig.currentPage
      ) as PlanetsData)
      : (planets.results as PlanetsData);

    return transformedPlanets.map((planet) => {
      const { name, climate, terrain, population, residents } = planet;
      return {
        name,
        climate: climate.split(",").map((item) => item.trim()),
        terrain: terrain.split(",").map((item) => item.trim()),
        population,
        residents: residents?.length.toString(),
      };
    });
  };

  return { fetchPlanets };
}

export { usePlanets };
