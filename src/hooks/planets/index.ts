import { useCallback } from "react";
import planets from "../../data/planets.json";
import { PaginationConfig, PaginationResult } from "./types";
import { usePaginate } from "../paginate";
import { PlanetsData } from "../../data/types";

type UsePlanets = {
  fetchPlanets: (paginationConfig?: PaginationConfig) => PaginationResult;
};

function usePlanets(): UsePlanets {
  const { paginate } = usePaginate();

  const fetchPlanets = useCallback((paginationConfig?: PaginationConfig): PaginationResult => {
    const transformedPlanets = paginationConfig
      ? (paginate(
        planets.results,
        paginationConfig.perPage,
        paginationConfig.currentPage
      ) as PlanetsData)
      : (planets.results as PlanetsData);

    const results = transformedPlanets.map((planet) => {
      const { name, climate, terrain, population, residents } = planet;
      return {
        name,
        climate: climate.split(",").map((item) => item.trim()),
        terrain: terrain.split(",").map((item) => item.trim()),
        population,
        residents: residents?.length.toString(),
      };
    });

    return { results, totalCount: planets.results.length }; //planets.results.length could come from the API in real life
  }, [paginate]);

  return { fetchPlanets };
}

export { usePlanets };
