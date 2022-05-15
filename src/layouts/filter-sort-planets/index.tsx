import { HTMLAttributes } from "react";
import { PlanetT } from "../../components/planet/types";
import Select from "../../components/select";
import SelectMulti from "../../components/select-multi";
import { SortPlanetsByE } from "../../store/enums";
import usePlanetsContext from "../../store/PlanetsContext";
import { StyledFilterSortWrapper } from "./styles";

// I could make this file more generic to access props and emit and event,
// and allow the parent handle the sorting, whichever way they WatchFileKind,
// but that would be too much work for the parent.
// Since the components of this sort-filter is already doing the dumb work, I can make this smart to labour is distributed

type Props = {
  onTriggered: () => void;
};

const OPTIONS: Set<SortPlanetsByE> = new Set([
  SortPlanetsByE.NAME,
  SortPlanetsByE.POPULATION,
  SortPlanetsByE.RESIDENTS,
]);

const FilterSort = ({ onTriggered, ...props }: Props & HTMLAttributes<HTMLDivElement>) => {
  const { searchedPlanets, sortFilteredPlanets, searchPlanets, filterPlanets } =
    usePlanetsContext();

  const getTerrainOptions = (planets: Array<PlanetT>) => {
    const terrainOptions: Array<Array<string>> = [];

    planets.forEach(
      (planet) =>
        planet.terrain !== ["unknown"] &&
        planet.terrain !== [""] &&
        planet.terrain.length > 0 &&
        terrainOptions.push(planet.terrain)
    );
    
    return new Set(terrainOptions.flat());
  };

  const onSetActiveSort = (newSortValue: SortPlanetsByE) => {
    sortFilteredPlanets(newSortValue);
    onTriggered();
  };

  const onSearchByName = (query: string) => {
    searchPlanets(query);
    onTriggered();
  };

  const onFilterPlanets = (selectedTerrain: Array<string>) => {
    filterPlanets(selectedTerrain)
    onTriggered();
  }

  return (
    <StyledFilterSortWrapper {...props}>
      <div className="search">
        <input type="text" onChange={(e) => onSearchByName(e.target.value)} placeholder="Search planet names" />
      </div>
      <div className="sort-filter">
        <SelectMulti
          options={getTerrainOptions(searchedPlanets)}
          searchable
          onValueChange={onFilterPlanets}
          label="Filter by"
        />
        <Select
          data-testid="sort"
          options={OPTIONS}
          onChange={(e) => onSetActiveSort(e as SortPlanetsByE)}
          label="Sort by"
        />
      </div>
    </StyledFilterSortWrapper>
  );
};

export default FilterSort;
