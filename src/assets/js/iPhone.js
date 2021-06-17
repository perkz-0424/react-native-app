import { Platform, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
// iPhoneX Xs
const X_WIDTH = 375;
const X_HEIGHT = 812;

// iPhoneXR XsMax
const XR_WIDTH = 414;
const XR_HEIGHT = 896;

// iPhone12 12pro
const HEIGHT12 = 844;
const WIDTH12 = 390;

//判断是否为iphoneX或Xs
const isIphoneX = () => {
  return (
    Platform.OS === "ios" &&
    ((SCREEN_HEIGHT === X_HEIGHT && SCREEN_WIDTH === X_WIDTH) ||
      (SCREEN_HEIGHT === X_WIDTH && SCREEN_WIDTH === X_HEIGHT))
  );
};

//判断是否为iphoneXR或XsMAX
const isIphoneXR = () => {
  return (
    Platform.OS === "ios" &&
    ((SCREEN_HEIGHT === XR_HEIGHT && SCREEN_WIDTH === XR_WIDTH) ||
      (SCREEN_HEIGHT === XR_WIDTH && SCREEN_WIDTH === XR_HEIGHT))
  );
};
//判断是否为iphone12或12pro
const isIphone12 = () => {
  return (
    Platform.OS === "ios" &&
    ((SCREEN_HEIGHT === HEIGHT12 && SCREEN_WIDTH === WIDTH12) ||
      (SCREEN_HEIGHT === WIDTH12 && SCREEN_WIDTH === HEIGHT12))
  );
};

//判断刘海屏
const isBangsScreen = () => {
  return (isIphoneX() || isIphoneXR() || isIphone12());
};

export {
  isIphone12,
  isIphoneX,
  isIphoneXR,
};

export default isBangsScreen;
