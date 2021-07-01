import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import NewDonghuanH5 from "./modules/NewDonghuanH5";
import Login from "./modules/Login";
import Person from "./modules/Person";
import ForgetPwd from "./modules/ForgetPwd";
import HomePage from "./modules/HomePage";
import ForcedPasswordChange from "./modules/ForcedPasswordChange";
import MyMessage from "./modules/MyMessage";

const Stack = createStackNavigator();
const routers = [
  {
    title: "登录",
    name: "Login",
    component: Login,
    type: TransitionPresets.ScaleFromCenterAndroid
  },
  {
    title: "隐私政策",
    name: "Person",
    component: Person,
    type: TransitionPresets.ModalSlideFromBottomIOS
  },
  {
    title: "忘记密码",
    name: "ForgetPwd",
    component: ForgetPwd,
    type: TransitionPresets.ModalSlideFromBottomIOS
  },
  {
    title: "H5",
    name: "NewDonghuanH5",
    component: NewDonghuanH5,
    type: TransitionPresets.ScaleFromCenterAndroid
  },
  {
    title: "主页",
    name: "HomePage",
    component: HomePage,
    type: TransitionPresets.ScaleFromCenterAndroid
  },
  {
    title: "强制修改密码",
    name: "ForcedPasswordChange",
    component: ForcedPasswordChange,
    type: TransitionPresets.SlideFromRightIOS
  },
  {
    title: "消息",
    name: "MyMessage",
    component: MyMessage,
    type: TransitionPresets.SlideFromRightIOS
  }
];
const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {
          routers.map((items, index) => {
            return (
              <Stack.Screen
                key={index}
                name={items.name}
                component={items.component}
                options={{
                  headerShown: false,
                  ...items.type,
                }}/>
            );
          })
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
