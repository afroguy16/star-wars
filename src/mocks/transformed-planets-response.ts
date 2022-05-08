import { PlanetT } from "../components/planet/types";

export const results: PlanetT[] = [
  {
    name: "Tatooine",
    climate: ["arid"],
    terrain: ["desert"],
    population: "200000",
    residents: "10",
  },
  {
    name: "Alderaan",
    climate: ["temperate"],
    terrain: ["grasslands", " mountains"],
    population: "2000000000",
    residents: "3",
  },
  {
    name: "Yavin IV",
    climate: ["temperate", ", tropical"],
    terrain: ["jungle", ", rainforests"],
    population: "1000",
    residents: "0",
  },
  {
    name: "Hoth",
    climate: ["frozen"],
    terrain: ["tundra", "ice caves", "mountain ranges"],
    population: "unknown",
    residents: "0"
  },
  {
    name: "Dagobah",
    climate: ["murky"],
    terrain: ["swamp", "jungles"],
    population: "unknown",
    residents: "0",
  },
  {
    name: "Bespin",
    climate: ["temperate"],
    terrain: ["gas giant"],
    population: "6000000",
    residents: "1",
  },
];

export const mockedPaginatedItem: PlanetT[] = [
  {
    name: "Yavin IV",
    climate: ["temperate", ", tropical"],
    terrain: ["jungle", ", rainforests"],
    population: "1000",
    residents: "0",
  },
  {
    name: "Hoth",
    climate: ["frozen"],
    terrain: ["tundra", "ice caves", "mountain ranges"],
    population: "unknown",
    residents: "0"
  },
];