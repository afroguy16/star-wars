import { useState } from "react";
import { ThemeProvider } from "styled-components";
import Nav from "./layouts/nav";
import themes from "./themes";
import { ThemesE } from "./themes/enums";
import Planets from "./pages/planets";
import { PlanetsProvider } from "./store/PlanetsContext";

const App = () => {
  const [activeTheme, setActiveTheme] = useState<ThemesE>(ThemesE.LIGHT);

  const onToggleTheme = () =>
    setActiveTheme(
      activeTheme === ThemesE.LIGHT ? ThemesE.DARK : ThemesE.LIGHT
    );

  return (
    <ThemeProvider theme={themes[activeTheme]}>
      <Nav onToggleSwitch={onToggleTheme} />
      <PlanetsProvider>
        <Planets />
      </PlanetsProvider>
    </ThemeProvider>
  );
};

export default App;
