import { HTMLAttributes, memo, useCallback, useMemo } from "react";
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

const FilterSort = memo(({ onTriggered, ...props }: Props & HTMLAttributes<HTMLDivElement>) => {
  const { searchedPlanets, sortSearchedPlanets, searchPlanets, filterPlanets } =
    usePlanetsContext();

  const getTerrainOptions = useMemo(() => {
    const terrainOptions: Array<Array<string>> = [];

    searchedPlanets.forEach(
      (searchedPlanet) =>
        searchedPlanet.terrain !== ["unknown"] &&
        searchedPlanet.terrain !== [""] &&
        searchedPlanet.terrain.length > 0 &&
        terrainOptions.push(searchedPlanet.terrain)
    );
    
    return new Set(terrainOptions.flat());
  }, [searchedPlanets]);

  const onSetActiveSort = useCallback((newSortValue: SortPlanetsByE) => {
    sortSearchedPlanets(newSortValue);
    onTriggered();
  }, [sortSearchedPlanets, onTriggered]);

  const onSearchByName = (query: string) => {
    searchPlanets(query);
    onTriggered();
  };

  const onFilterPlanets = useCallback((selectedTerrain: Array<string>) => {
    filterPlanets(selectedTerrain)
    onTriggered();
  }, [filterPlanets, onTriggered])

  return (
    <StyledFilterSortWrapper {...props}>
      <div className="search">
        <input type="text" onChange={(e) => onSearchByName(e.target.value)} placeholder="Search planet names" />
      </div>
      <div className="sort-filter">
        <SelectMulti
          options={getTerrainOptions}
          searchable
          onValueChange={onFilterPlanets}
          label="Filter by"
        />
        <Select
          data-testid="sort"
          options={OPTIONS}
          onChange={useCallback((e) => onSetActiveSort(e as SortPlanetsByE), [onSetActiveSort])}
          label="Sort by"
        />
      </div>
    </StyledFilterSortWrapper>
  );
});

export default FilterSort;
