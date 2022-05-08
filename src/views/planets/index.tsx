import Planet from "../../components/planet";
import { usePlanets } from "../../hooks/planets";
import { StyledPlanetsWrapper } from "./styles";

const Planets = () => {
  const { fetchPlanets } = usePlanets();

  const getPlanetsElements = () => {
    return fetchPlanets().map((planet, index) => (
      <li key={index}>
        <Planet meta={planet} />
      </li>
    ));
  };

  return (
    <StyledPlanetsWrapper>
      <ul>{getPlanetsElements()}</ul>
    </StyledPlanetsWrapper>
  );
};

export default Planets;
