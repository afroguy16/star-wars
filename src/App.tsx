import { useState } from "react";
import { ThemeProvider } from "styled-components";
import themes from "./themes";
import { ThemesE } from "./themes/enums";
import Home from "./views/home";

const App = () => {
  const [activeTheme, setActiveTheme] = useState<ThemesE>(ThemesE.LIGHT);

  const onToggleTheme = () =>
    setActiveTheme(
      activeTheme === ThemesE.LIGHT ? ThemesE.DARK : ThemesE.LIGHT
    );

  return (
    <ThemeProvider theme={themes[activeTheme]}>
      <Home />
    </ThemeProvider>
  );
};

export default App;
