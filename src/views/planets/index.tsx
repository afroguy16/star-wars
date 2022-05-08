import Planet from "../../components/planet";
import { usePlanets } from "../../hooks/planets";
import { StyledPlanets } from "./styles";

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
    <StyledPlanets>
      {getPlanetsElements()}
    </StyledPlanets>
  );
};

export default Planets;
