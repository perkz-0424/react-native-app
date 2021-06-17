import React from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import Theme from "./src/components/Theme";

const AppRoot = () => {
  return (
    <Theme>
      <App/>
    </Theme>
  );
};

AppRegistry.registerComponent(appName, () => AppRoot);
