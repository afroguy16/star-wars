import { useEffect, useState } from "react";
import PaginationControls from "../../components/pagination-controls";
import Planet from "../../components/planet";
import { PlanetT } from "../../components/planet/types";
import { usePlanets } from "../../hooks/planets";
import { StyledPlanetsWrapper } from "./styles";

const PER_PAGE = 10;

const Planets = () => {
  const { fetchPlanets } = usePlanets();
  const [currentPage, setCurrenPage] = useState(1);
  const [planets, setPlanets] = useState<Array<PlanetT>>([]);
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const { results, totalCount: count} = fetchPlanets({ perPage: PER_PAGE, currentPage })
    setPlanets(results)
    setTotalCount(count)
  }, [currentPage, fetchPlanets]);

  const onSetCurrentPage = (newCurrentPage: number) => {
    setCurrenPage(newCurrentPage);
  };

  const getPlanetsElements = () => {
    return planets.map((planet, index) => (
      <li key={index}>
        <Planet meta={planet} />
      </li>
    ));
  };

  return (
    <StyledPlanetsWrapper>
      <ul className="planet-list">{getPlanetsElements()}</ul>
      <PaginationControls
        perPage={PER_PAGE}
        totalCount={totalCount}
        onSelectPage={onSetCurrentPage}
      />
    </StyledPlanetsWrapper>
  );
};

export default Planets;
