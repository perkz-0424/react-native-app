import React from "react";
import { createSwitchNavigator } from "react-navigation";

const DefaultNavigator = (routers, initialRouteName) => {
  return createSwitchNavigator(
    {
      ...routers,
    }, {
      initialRouteName,
      backBehavior: "history",
    },
  );
};
export default DefaultNavigator;
