import { StyledPlanetWrapper } from "./styles";
import { PlanetT } from "./type";

type Props = {
  meta: PlanetT;
};

const Planet = ({
  meta: { name, terrain, climate, population, residents },
}: Props) => {
  const getElements = (arr: Array<string>) =>
    arr.map((item, index) => <li key={index}>{item}</li>);

  return (
    <StyledPlanetWrapper>
      <ul className="climate">{getElements(climate)}</ul>
      <div className="main">
        <div className="name">
          <p>{name}</p>
        </div>
        <div className="people">
          <div className="population">
            <p>{population}</p>
            <p>Population</p>
          </div>
          <div className="residents">
            <p>{residents}</p>
            <p>Residents</p>
          </div>
        </div>
      </div>
      <ul className="terrain">{getElements(terrain)}</ul>
    </StyledPlanetWrapper>
  );
};

export default Planet;
