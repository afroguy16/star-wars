import { useState } from "react";
import { ThemeProvider } from "styled-components";
import TopBar from "./layouts/top-bar";
import themes from "./themes";
import { ThemesE } from "./themes/enums";
import Planets from "./pages/planets";
import { PlanetsProvider } from "./store/PlanetsContext";
import { StyledAppWrapper } from "./App.styles";

const App = () => {
  const [activeTheme, setActiveTheme] = useState<ThemesE>(ThemesE.LIGHT);

  const onToggleTheme = () =>
    setActiveTheme(
      activeTheme === ThemesE.LIGHT ? ThemesE.DARK : ThemesE.LIGHT
    );

  return (
    <ThemeProvider theme={themes[activeTheme]}>
      <StyledAppWrapper>
        <TopBar onToggleSwitch={onToggleTheme} />
        <PlanetsProvider>
          <Planets />
        </PlanetsProvider>
      </StyledAppWrapper>
    </ThemeProvider>
  );
};

export default App;
