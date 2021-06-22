import React, { useState } from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { View, Dimensions, Platform, Text } from "react-native";
import Title from "../../components/Title";
import Home from "./Home";
import Area from "./Area";

const Stack = createStackNavigator();
const HomePage = () => {
  const [title, set_title] = useState("告警列表");
  const [area, set_area] = useState("浙江省");
  return (
    <View
      style={{ height: Platform.OS === "ios" ? Dimensions.get("window").height : Dimensions.get("window").height - 25 }}>
      <Title
        title={title === "个人中心" ? "" : title}
        onLeftPress={() => {}}
        titleLeft={<View style={{ display: title === "个人中心" ? "none" : "flex" }}>
          <Text style={{ fontWeight: "300" }}>{area}</Text>
        </View>}
      />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{
          headerShown: false,
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}
        />
        <Stack.Screen name="Area" component={Area} options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        />
      </Stack.Navigator>
    </View>
  );
};
export default HomePage;
