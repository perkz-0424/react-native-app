import React from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import Theme from "./src/components/Theme";
import { Provider } from "react-redux";
import store from "./src/store";

const AppRoot = () => {
  return (
    <Theme>
      <Provider store={store}>
        <App/>
      </Provider>
    </Theme>
  );
};

AppRegistry.registerComponent(appName, () => AppRoot);
