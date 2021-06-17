import React from "react";
import { Platform } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";
import NewDonghuanH5 from "../modules/NewDonghuanH5";
import Login from "../modules/Login/index";
import Person from "../modules/Person";

const routers = {
  NewDonghuanH5,
  Login,
  Person,
};

const Transitions = () => {
  return (
    <Transition.Together>
      <Transition.Out type="slide-left" durationMs={200} interpolation="easeIn"/>
      <Transition.In type="slide-right" durationMs={200} interpolation="easeIn"/>
    </Transition.Together>
  );
};
const Routers = Platform.OS === "ios" ? createAppContainer(createAnimatedSwitchNavigator(
  {
    ...routers,
  }, {
    transition: <Transitions/>,
    initialRouteName: "Login",
    backBehavior: "history",
  },
)) : createAppContainer(createSwitchNavigator(
  {
    ...routers,
  }, {
    initialRouteName: "Login",
    backBehavior: "history",
  },
));
export default Routers;
