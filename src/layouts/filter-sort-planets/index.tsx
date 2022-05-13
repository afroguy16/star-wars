import { useState } from "react";
import Select from "../../components/select";
import { SortPlanetsByE } from "../../store/enums";
import usePlanetsContext from "../../store/PlanetsContext";
import { StyledFilterSortWrapper } from "./styles";

// I could make this file more generic to access props and emit and event,
// and allow the parent handle the sorting, whichever way they WatchFileKind,
// but that would be too much work for the parent.
// Since the components of this sort-filter is already doing the dumb work, I can make this smart to labour is distributed

const OPTIONS: Set<SortPlanetsByE> = new Set([
  SortPlanetsByE.NAME,
  SortPlanetsByE.POPULATION,
  SortPlanetsByE.RESIDENTS,
]);

const FilterSort = () => {
  const [, setActiveSort] = useState<SortPlanetsByE>();
  const { sortFilteredPlanets } = usePlanetsContext();

  const onSetActiveSort = (newSortValue: SortPlanetsByE) => {
    sortFilteredPlanets(newSortValue);
    setActiveSort(newSortValue);
  };

  return (
    <StyledFilterSortWrapper>
      <Select
        data-testid="sort"
        options={OPTIONS}
        onChange={(e) => onSetActiveSort(e as SortPlanetsByE)}
      />
    </StyledFilterSortWrapper>
  );
};

export default FilterSort;
