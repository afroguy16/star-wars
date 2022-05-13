import { useEffect, useState } from "react";
import PaginationControls from "../../components/pagination-controls";
import Planet from "../../components/planet";
import { PlanetT } from "../../components/planet/types";
import { usePaginate } from "../../hooks/paginate";
import { usePlanets } from "../../hooks/planets";
import FilterSort from "../../layouts/filter-sort-planets";
import usePlanetsContext from "../../store/PlanetsContext";
import { StyledPlanetsWrapper } from "./styles";

const PER_PAGE = 10;
const DEFAULT_CURRENT_PAGE = 1;

const Planets = () => {
  const {fetchPlanets} = usePlanets();
  const {paginate} = usePaginate();
  const {savePlanets, filteredPlanets} = usePlanetsContext();
  const [currentPage, setCurrenPage] = useState(DEFAULT_CURRENT_PAGE);

  useEffect(() => {
    const planets = fetchPlanets();
    savePlanets(planets);
  }, [fetchPlanets, savePlanets]);

  const onSetCurrentPage = (newCurrentPage: number) => {
    setCurrenPage(newCurrentPage);
  };

  const getPlanetsElements = () => {
    const paginatedPlanets = paginate(filteredPlanets, PER_PAGE, currentPage) as Array<PlanetT>

    return paginatedPlanets.map((planet, index) => (
      <li key={index}>
        <Planet meta={planet} />
      </li>
    ));
  };

  const resetCurrentPage = () => {
    setCurrenPage(DEFAULT_CURRENT_PAGE)
  }

  const onFilterSortTriggered = () => {
    resetCurrentPage()
  }

  return (
    <StyledPlanetsWrapper>
      <FilterSort onTriggered={onFilterSortTriggered} />
      <ul className="planet-list">{getPlanetsElements()}</ul>
      <div data-testid="pagination-control-wrapper">
        <PaginationControls
          parentControlledActivePage={currentPage}
          perPage={PER_PAGE}
          totalCount={filteredPlanets.length}
          onSelectPage={onSetCurrentPage}
        />
      </div>
    </StyledPlanetsWrapper>
  );
};

export default Planets;
