import { ThemeProvider } from "styled-components"
import themes from "./themes";
import Home from "./views/home";

const App = () => {
  return (
    <ThemeProvider theme={themes['dark']}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
