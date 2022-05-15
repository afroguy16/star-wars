import { StyledPlanetWrapper } from "./styles";
import { PlanetT } from "./types";

type Props = {
  meta: PlanetT;
};

const Planet = ({
  meta: { name, terrain, climate, population, residents },
}: Props) => {
  const getElements = (arr: Array<string>) =>
    arr.map((item, index) => <li key={index}>{item}</li>);

  return (
    <StyledPlanetWrapper aria-label="planet">
      <ul className="climate">{getElements(climate)}</ul>
      <div className="main">
        <div className="name">
          <p>{name}</p>
        </div>
        <div className="people-count">
          <div className="population">
            <p className="count">
              {population >= 0 ? population.toLocaleString() : "unknown"}
            </p>
            <p className="label">Population</p>
          </div>
          <div className="residents">
            <p className="count">{residents.toLocaleString()}</p>
            <p className="label">Residents</p>
          </div>
        </div>
      </div>
      <ul className="terrain">{getElements(terrain)}</ul>
      <div className="decoration"></div>
    </StyledPlanetWrapper>
  );
};

export default Planet;
