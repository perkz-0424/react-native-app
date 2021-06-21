import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import NewDonghuanH5 from "../modules/NewDonghuanH5";
import Login from "../modules/Login";
import Person from "../modules/Person";
import ForgetPwd from "../modules/ForgetPwd";
import HomePage from "../modules/HomePage";

const Stack = createStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{
          headerShown: false,
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}/>
        <Stack.Screen name="Person" component={Person} options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}/>
        <Stack.Screen name="ForgetPwd" component={ForgetPwd} options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}/>
        <Stack.Screen name="NewDonghuanH5" component={NewDonghuanH5} options={{
          headerShown: false,
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}/>
        <Stack.Screen name="HomePage" component={HomePage} options={{
          headerShown: false,
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
