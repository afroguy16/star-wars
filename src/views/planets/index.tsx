import { useState } from "react";
import Loading from "../../components/loading";
import { StyledPlanetsWrapper } from "./styles";

const LOADING_TEXT = "Fetching planets";

const Planets = () => {
  const [loading, setLoading] = useState(true);

  return (
    <StyledPlanetsWrapper>
      {loading && (
        <div data-testid="loading" className="loading-wrapper">
          <Loading text={LOADING_TEXT} />
        </div>
      )}
    </StyledPlanetsWrapper>
  );
};

export default Planets;
