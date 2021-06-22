import React, { useState } from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { View, Dimensions, Platform, Text, Image } from "react-native";
import Title from "../../components/Title";
import Home from "./Home";
import Area from "./Area";

const Stack = createStackNavigator();
const HomePage = (props) => {
  const [title, set_title] = useState("告警列表");
  const [area, set_area] = useState("浙江省");
  const onAreOrBack = () => {
    if (title === "区域选择") {
      set_title("告警列表");
      props.navigation.navigate("Home");
    } else {
      set_title("区域选择");
      props.navigation.navigate("Area");
    }
  };
  return (
    <View
      style={{ height: Platform.OS === "ios" ? Dimensions.get("window").height : Dimensions.get("window").height - 25 }}>
      <Title
        title={title === "个人中心" ? "" : title}
        onLeftPress={onAreOrBack}
        titleLeft={
          <View style={{ display: title === "个人中心" ? "none" : "flex" }}>
            {
              title === "区域选择" ? <Image
                style={{ width: 12, height: 18 }}
                source={require("../../assets/images/icon/back.png")}
              /> : <Text style={{ fontWeight: "300" }}>{area}</Text>
            }
          </View>
        }
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
