import React from "react";
import { createSwitchNavigator } from "react-navigation";

const DefaultNavigator = (routers) => {
  return createSwitchNavigator(
    {
      ...routers,
    }, {
      initialRouteName: "Login",
      backBehavior: "history",
    },
  );
};
export default DefaultNavigator;
