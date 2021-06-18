import React from "react";
import { createAppContainer } from "react-navigation";
import StackNavigator from "../components/Navigator/StackNavigator/index";
import DefaultNavigator from "../components/Navigator/DefaultNavigator";
/**page**/
import NewDonghuanH5 from "../modules/NewDonghuanH5";
import Login from "../modules/Login/index";
import Person from "../modules/Person";
import ForgetPwd from "../modules/ForgetPwd";

/**从右往左弹出路由**/
const stackRightRouters = {
  Login: {
    screen: Login
  },
  Person: {
    screen: Person
  },
};

/**从下往上弹出路由**/
const stackBottomRouters = {
  StackRightRouters: {
    screen: StackNavigator({ ...stackRightRouters }, "Login", "SlideFromRightIOS")
  },
  NewDonghuanH5: {
    screen: NewDonghuanH5
  },
  ForgetPwd: {
    screen: ForgetPwd
  },
};
/**中间弹出式路由**/
const centerRouters = {
  StackBottomRouters: {
    screen: StackNavigator({ ...stackBottomRouters }, "StackRightRouters", "FadeFromBottomAndroid")
  },
};
const defaultRouters = {
  CenterRouters: {
    screen: StackNavigator({ ...centerRouters }, "StackBottomRouters", "ScaleFromCenterAndroid")
  }
};
const Routers = DefaultNavigator({ ...defaultRouters }, "CenterRouters",);
export default createAppContainer(Routers);
