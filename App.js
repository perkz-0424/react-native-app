import React, { useContext } from "react";
import { ThemeContext } from "./src/components/Theme";
import { Provider } from "@ant-design/react-native";
import Routers from "./src/router";

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Provider theme={theme}>
      <Routers/>
    </Provider>
  );
};

export default App;

