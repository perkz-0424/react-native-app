import React from "react";
import { createStackNavigator, TransitionPresets } from "react-navigation-stack";

const StackNavigator = (routers, initialRouteName, type) => {
  const options = {
    direction: TransitionPresets.DefaultTransition
  };
  switch (type) {
    case "SlideFromRightIOS":
      options.direction = TransitionPresets.SlideFromRightIOS;
      break;
    case "FadeFromBottomAndroid":
      options.direction = TransitionPresets.FadeFromBottomAndroid;
      break;
    case "ModalSlideFromBottomIOS":
      options.direction = TransitionPresets.ModalSlideFromBottomIOS;
      break;
    case "ModalPresentationIOS":
      options.direction = TransitionPresets.ModalPresentationIOS;
      break;
    case "ModalTransition":
      options.direction = TransitionPresets.ModalTransition;
      break;
    case "RevealFromBottomAndroid":
      options.direction = TransitionPresets.RevealFromBottomAndroid;
      break;
    case "ScaleFromCenterAndroid":
      options.direction = TransitionPresets.ScaleFromCenterAndroid;
      break;
    case "DefaultTransition":
      options.direction = TransitionPresets.DefaultTransition;
      break;
    default:
      options.direction = TransitionPresets.DefaultTransition;
  }
  return createStackNavigator({
      ...routers
    },
    {
      headerMode: "none",
      initialRouteName,
      defaultNavigationOptions: {
        ...options.direction,
      }
    }
  );
};
export default StackNavigator;
