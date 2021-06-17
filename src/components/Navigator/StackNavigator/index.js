import React from "react";
import { createStackNavigator, TransitionPresets } from "react-navigation-stack";

const StackNavigator = (routers) => {
  return createStackNavigator({
      ...routers
    },
    {
      headerMode: "none",
      initialRouteName: "Login",
      defaultNavigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
      }
    }
  );
};
export default StackNavigator;
