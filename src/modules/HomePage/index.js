import React, { useState } from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { View, Dimensions, Platform, Text, Image } from "react-native";
import { connect } from "react-redux";
import Title from "../../components/Title";
import Home from "./Home";
import Area from "./Area";

const Stack = createStackNavigator();
const HomePage = (props) => {
  const title = props.state.titles.title;
  const area = props.state.areas.data;
  const [backTitle, set_backTitle] = useState("告警列表");
  const changeTitle = (title) => {
    props.dispatch(dispatch => {
      dispatch({
        type: "TITLE",
        payload: { title }
      });
    });
  };
  const onAreOrBack = () => {
    if (title === "区域选择") {
      changeTitle(backTitle);
      props.navigation.navigate("Home");
    } else {
      if (title !== "个人中心") {
        set_backTitle(title);
        changeTitle("区域选择");
        props.navigation.navigate("Area");
      }
    }
  };
  return (
    <View
      style={{ height: Platform.OS === "ios" ? Dimensions.get("window").height : Dimensions.get("window").height - 25 }}>
      <Title
        title={title === "个人中心" ? "" : props.state.titles.title}
        onLeftPress={onAreOrBack}
        titleLeft={
          <View style={{ display: title === "个人中心" ? "none" : "flex" }}>
            {
              title === "区域选择" ?
                <Image
                  style={{ width: 12, height: 18 }}
                  source={require("../../assets/images/icon/back.png")}
                /> :
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "300", fontSize: 12 }}>
                    {area}
                  </Text>
                  <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 8 }}>
                    <Image
                      style={{ width: 10, height: 4 }}
                      source={require("../../assets/images/icon/open_up.png")}
                    />
                  </View>
                </View>
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
export default connect(state => ({ state }))(HomePage);
