/*目前android用不了，ios能用，改用StackNavigator*/
import React from "react";
import { Transition } from "react-native-reanimated";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";

const Transitions = () => {
  return (
    <Transition.Together>
      <Transition.Out type="slide-left" durationMs={100} interpolation="easeIn"/>
      <Transition.In type="slide-right" durationMs={100} interpolation="easeIn"/>
    </Transition.Together>
  );
};
const AnimateSwitchNavigator = (routers) => {
  return createAnimatedSwitchNavigator(
    {
      ...routers,
    }, {
      transition: <Transitions/>,
      initialRouteName: "Login",
      backBehavior: "history",
    },
  );
};

export default AnimateSwitchNavigator;
